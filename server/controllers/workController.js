import Work from '../models/Work.js';
import User from '../models/User.js';
import path from 'path';
import { uploadFile, getFileUrl, deleteFile } from '../services/s3Service.js';

// Вспомогательная функция
const saveFilesToS3 = async (files, workId) => {
  const savedFiles = [];

  for (const file of files) {
    const fileExt = path.extname(file.originalname);
    const fileName = `works/${workId}/${Date.now()}${fileExt}`;

    try {
      await uploadFile(file.buffer, fileName, file.mimetype);

      savedFiles.push({
        path: fileName,
        originalName: file.originalname,
        mimeType: file.mimetype
      });
    } catch (err) {
      console.error('Error uploading file to S3:', err);
      throw err;
    }
  }

  return savedFiles;
};

export const uploadWork = async (req, res) => {
      console.log('Files received:', req.files);
  console.log('Body:', req.body);
  try {
    const { description, price, filters, technologies } = req.body;
    const userId = req.userId;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No files uploaded' });
    }

    const savedFiles = await saveFilesToS3(req.files, userId);

    const newWork = new Work({
      description,
      price,
      filters: JSON.parse(filters),
      technologies: JSON.parse(technologies),
      files: savedFiles,
      author: userId,
    });

    await newWork.save();

    // Добавить работу пользователю
    await User.findByIdAndUpdate(userId, { $push: { works: newWork._id } });

    res.status(201).json({ success: true, work: newWork });
  } catch (err) {
    console.error('Error uploading work:', err);
    res.status(500).json({ success: false, message: 'Upload failed', error: err.message });
  }
};

export const getWorks = async (req, res) => {
  try {
    const works = await Work.find().populate('author', 'name avatar');

    const worksWithUrls = await Promise.all(works.map(async work => {
      const filesWithUrls = await Promise.all(work.files.map(async file => {
        const url = await getFileUrl(file.path);
        return { ...file.toObject(), url };
      }));
      return { ...work.toObject(), files: filesWithUrls };
    }));

    res.json({ success: true, works: worksWithUrls });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch works',
      error: error.message
    });
  }
};

export const getWorkById = async (req, res) => {
  try {
    const work = await Work.findById(req.params.id).populate('author', 'name avatar');
    if (!work) {
      return res.status(404).json({ success: false, message: 'Work not found' });
    }

    const filesWithUrls = await Promise.all(work.files.map(async file => {
      const url = await getFileUrl(file.path);
      return { ...file.toObject(), url };
    }));

    res.json({
      success: true,
      work: { ...work.toObject(), files: filesWithUrls }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch work',
      error: error.message
    });
  }
};

export const deleteWork = async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);
    if (!work) {
      return res.status(404).json({
        success: false,
        message: 'Work not found'
      });
    }

    await Promise.all(
      work.files.map(file =>
        deleteFile(file.path).catch(err => console.error('Error deleting file:', err))
      )
    );

    await User.findByIdAndUpdate(work.author, {
      $pull: { works: work._id }
    });

    await work.deleteOne();

    res.json({
      success: true,
      message: 'Work deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete work',
      error: error.message
    });
  }
};

export const updateWork = async (req, res) => {
  try {
    const workId = req.params.id;
    const { description, price, filters, technologies } = req.body;
    
    const work = await Work.findById(workId);
    if (!work) {
      return res.status(404).json({ success: false, message: 'Work not found' });
    }
    
    // Обновляем поля (если они есть в запросе)
    if (description) work.description = description;
    if (price) work.price = price;
    if (filters) work.filters = JSON.parse(filters);
    if (technologies) work.technologies = JSON.parse(technologies);

    // Если загружены новые файлы — нужно загрузить их и добавить
    if (req.files && req.files.length > 0) {
      // Загружаем новые файлы в S3
      const newFiles = await saveFilesToS3(req.files, work.author.toString());
      // Добавляем новые файлы к уже существующим
      work.files = work.files.concat(newFiles);
    }
    
    await work.save();

    res.json({ success: true, work });
  } catch (err) {
    console.error('Error updating work:', err);
    res.status(500).json({ success: false, message: 'Failed to update work', error: err.message });
  }
};
