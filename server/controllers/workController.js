import Work from '../models/Work.js';
import User from '../models/User.js';
import path from 'path';
import { uploadFile, getFileUrl, deleteFile } from '../services/s3Service.js';

const saveFilesToS3 = async (files, workId) => {
  const savedFiles = [];

  for (const file of files) {
    const fileExt = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const fileName = `works/${workId}/${uniqueSuffix}${fileExt}`;

    try {
      await uploadFile(file.buffer, fileName, file.mimetype);

      savedFiles.push({
        path: fileName,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size
      });
    } catch (err) {
      console.error('Error uploading file to S3:', err);
      await Promise.all(savedFiles.map(f => deleteFile(f.path).catch(e => console.error(e))));
      throw err;
    }
  }

  return savedFiles;
};

export const uploadWork = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }
    
    // Process files and upload to S3
    const uploadResults = await Promise.all(
      req.files.map(file => uploadFile(file.buffer, file.originalname, file.mimetype))
    );
    
    // Save to database, etc.
    
    res.status(200).json({
      success: true,
      message: 'Files uploaded successfully',
      files: uploadResults
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload files',
      error: error.message
    });
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
