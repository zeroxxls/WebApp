import Work from '../models/Work.js';
import User from '../models/User.js';
import { saveFilesToS3, getFileUrls } from '../utils/fileUtils.js';
import { deleteFile } from '../services/s3Service.js';

export const fetchUserWorks = async (userId) => {
  const works = await Work.find({ author: userId }).populate('author', 'name avatar');
  return Promise.all(works.map(async work => ({
    ...work.toObject(),
    files: await getFileUrls(work.files),
  })));
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
  const works = await Work.find().populate('author', 'fullName name avatar');
  return Promise.all(works.map(async work => ({
    ...work.toObject(),
    files: await getFileUrls(work.files),
  })));
};

export const fetchWorkById = async (id) => {
  const work = await Work.findById(id).populate('author', 'name avatar');
  if (!work) {
    return null;
  }
  return { ...work.toObject(), files: await getFileUrls(work.files) };
};

export const removeWork = async (id) => {
  const work = await Work.findById(id);
  if (!work) {
    return false;
  }
  await Promise.all(work.files.map(file =>
    deleteFile(file.path).catch(err => console.error('Error deleting file:', err))
  ));
  await User.findByIdAndUpdate(work.author, { $pull: { works: work._id } });
  await work.deleteOne();
  return true;
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