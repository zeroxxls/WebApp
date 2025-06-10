import Work from '../models/Work.js';
import User from '../models/User.js';
import { saveFilesToS3, getFileUrls } from '../utils/fileUtils.js';
import { deleteFile } from '../services/s3Service.js';

export const fetchUserWorks = async (userId) => {
    const works = await Work.find({ owner: userId })
    .populate('author', 'fullName avatar')
    .populate('owner', 'fullName avatar');
  return Promise.all(works.map(async work => ({
    ...work.toObject(),
    files: await getFileUrls(work.files),
  })));
};

export const fetchLikedWorksForUser = async (userId) => {
  try {
    const user = await User.findById(userId).populate({
      path: 'likedWorks',
      populate: [
        { path: 'author', select: 'fullName avatar' },
        { path: 'files' },
      ],
    });
    return Promise.all(user.likedWorks.map(async work => ({
      ...work.toObject(),
      files: await getFileUrls(work.files),
    })));
  } catch (error) {
    console.error('Error fetching liked works for user:', error);
    throw error;
  }
};

export const createWork = async (reqFiles, body, authorId) => {
  const { title, description, price, technologies, filters } = body;
  const savedFiles = await saveFilesToS3(reqFiles, authorId.toString());

  const newWork = new Work({
    title,
    description,
    price: parseFloat(price),
    technologies: JSON.parse(technologies || '[]'),
    filters: JSON.parse(filters || '[]'),
    files: savedFiles,
    author: authorId,
  });

  const savedWork = await newWork.save();
  await User.findByIdAndUpdate(authorId, { $push: { works: savedWork._id } });
  return { ...savedWork.toObject(), files: await getFileUrls(savedWork.files) };
};

export const fetchAllWorks = async () => {
  const works = await Work.find()
    .populate('author', 'fullName name avatar')
    .populate('owner', 'fullName name avatar');
  return Promise.all(works.map(async work => ({
    ...work.toObject(),
    files: await getFileUrls(work.files),
  })));
};

export const fetchWorkById = async (id) => {
  const work = await Work.findById(id)
    .populate('author', 'fullName avatar') // Измените 'name' на 'fullName'
    .populate('owner', 'fullName avatar'); // Добавьте это!
  if (!work) {
    return null;
  }
  return { ...work.toObject(), files: await getFileUrls(work.files) };
};

export const removeWork = async (id) => {
  try {
    const work = await Work.findById(id);
    if (!work) {
      console.log('Work not found');
      return false;
    }

    // Удаляем файлы из S3
    if (work.files && work.files.length > 0) {
      await Promise.all(work.files.map(async (file) => {
        try {
          await deleteFile(file.path);
          console.log(`File ${file.path} deleted from S3`);
        } catch (err) {
          console.error(`Error deleting file ${file.path}:`, err);
        }
      }));
    }

    // Удаляем работу из массива works пользователя
    const userUpdate = await User.findByIdAndUpdate(
      work.author,
      { $pull: { works: work._id } },
      { new: true }
    );
    
    console.log('User after update:', userUpdate?.works?.length);

    // Удаляем саму работу
    await work.deleteOne();
    
    console.log(`Work ${id} deleted successfully`);
    return true;
  } catch (error) {
    console.error('Error in removeWork:', error);
    return false;
  }
};

export const updateExistingWork = async (id, body, reqFiles, authorId) => {
  const { title, description, price, filters, technologies } = body;
  const work = await Work.findById(id);
  if (!work) {
    return null;
  }

  if (title) work.title = title;
  if (description) work.description = description;
  if (price) work.price = price;
  if (filters) work.filters = JSON.parse(filters);
  if (technologies) work.technologies = JSON.parse(technologies);

  if (reqFiles && reqFiles.length > 0) {
    const newFiles = await saveFilesToS3(reqFiles, authorId.toString());
    work.files = work.files.concat(newFiles);
  }

  await work.save();
  return { ...work.toObject(), files: await getFileUrls(work.files) };
};