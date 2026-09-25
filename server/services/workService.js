import Work from '../models/Work.js';
import User from '../models/User.js';
import { saveFilesToS3, getFileUrls } from '../utils/fileUtils.js';
import { deleteFile, getFileUrl } from '../services/s3Service.js';

const addCoverUrl = async (work) => {
  const files = (work.files || []).map(file => ({ ...file }));
  if (files[0]) {
    files[0].url = await getFileUrl(files[0].path);
  }
  return { ...work, files };
};

export const fetchUserWorks = async (userId) => {
  const works = await Work.find({ owner: userId })
    .populate('author', 'fullName updatedAt')
    .populate('owner', 'fullName updatedAt')
    .sort({ createdAt: -1, _id: -1 })
    .lean();
  return Promise.all(works.map(addCoverUrl));
};

export const fetchLikedWorksForUser = async (userId) => {
  try {
    const user = await User.findById(userId).select('+likedWorks').populate({
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

export const fetchAllWorks = async ({ page = 1, limit = 24, search = '' } = {}) => {
  const trimmedSearch = search.trim();
  let query = Work.find(trimmedSearch ? { $text: { $search: trimmedSearch } } : {});

  query = query
    .select('title description price filters technologies files author owner createdAt updatedAt')
    .populate('author', 'fullName name updatedAt')
    .populate('owner', 'fullName name updatedAt')
    .skip((page - 1) * limit)
    .limit(limit + 1);

  if (trimmedSearch) {
    query = query.select({ score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' }, createdAt: -1, _id: -1 });
  } else {
    query = query.sort({ createdAt: -1, _id: -1 });
  }

  const results = await query.lean();
  const hasMore = results.length > limit;
  const works = await Promise.all(results.slice(0, limit).map(addCoverUrl));
  return { works, page, hasMore };
};

export const fetchWorkById = async (id) => {
  const work = await Work.findById(id)
    .populate('author', 'fullName updatedAt')
    .populate('owner', 'fullName updatedAt');
  if (!work) {
    return null;
  }
  return { ...work.toObject(), files: await getFileUrls(work.files) };
};

export const removeWork = async (id, authorId) => {
  const work = await Work.findById(id);
  if (!work) {
    return false;
  }

  if (work.author.toString() !== authorId.toString()) {
    throw new Error('Unauthorized to delete this work');
  }

  if (work.files && work.files.length > 0) {
    await Promise.all(work.files.map(async (file) => {
      try {
        await deleteFile(file.path);
      } catch (err) {
        console.error(`Error deleting file ${file.path}:`, err);
      }
    }));
  }

  await User.findByIdAndUpdate(
    work.author,
    { $pull: { works: work._id } }
  );

  await work.deleteOne();
  return true;
};

export const updateExistingWork = async (id, body, reqFiles, authorId) => {
  const { title, description, price, filters, technologies } = body;
  const work = await Work.findById(id);
  if (!work) {
    return null;
  }

  if (work.author.toString() !== authorId.toString()) {
    throw new Error('Unauthorized to update this work');
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
