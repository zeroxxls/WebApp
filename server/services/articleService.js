import Article from '../models/Article.js';
import User from '../models/User.js';
import { uploadFile, deleteFile, getFileUrl } from './s3Service.js';

const saveArticleFilesToS3 = async (files, authorId) => {
  const fileDetails = [];
  for (const file of files) {
    const fileName = `articles/${authorId}/${Date.now()}-${file.originalname}`;
    await uploadFile(file.buffer, fileName, file.mimetype);
    const url = await getFileUrl(fileName);
    fileDetails.push(url);
  }
  return fileDetails;
};

export const createArticleService = async (articleData, files, authorId) => {
  const { title, description, content, tags } = articleData;

  let previewImageUrl = '';
  const imageUrls = [];

  if (files && files.length > 0) {
    const previewFileName = `articles/${authorId}/${Date.now()}-preview-${files[0].originalname}`;
    await uploadFile(files[0].buffer, previewFileName, files[0].mimetype);
    previewImageUrl = await getFileUrl(previewFileName);

    for (let i = 1; i < files.length; i++) {
      const file = files[i];
      const additionalFileName = `articles/${authorId}/${Date.now()}-img-${file.originalname}`;
      await uploadFile(file.buffer, additionalFileName, file.mimetype);
      const url = await getFileUrl(additionalFileName);
      imageUrls.push(url);
    }
  } else {
    throw new Error('No files uploaded for article.');
  }

  const newArticle = new Article({
    title,
    description,
    content,
    previewImage: previewImageUrl,
    images: imageUrls,
    author: authorId,
    tags: tags
  });

  const savedArticle = await newArticle.save();
  await User.findByIdAndUpdate(authorId, {
    $push: { articles: savedArticle._id }
  });

  return savedArticle;
};

export const fetchAllArticles = async (query = {}, options = {}) => {
  const articles = await Article.paginate(query, {
    ...options,
    populate: 'author',
    sort: { createdAt: -1 }
  });
  return articles;
};

export const fetchArticleById = async (id) => {
  const article = await Article.findById(id)
    .populate('author', 'fullName avatar')
    .populate({
      path: 'comments',
      populate: { path: 'author', select: 'fullName avatar' }
    });
  return article;
};

export const fetchUserArticles = async (userId) => {
  const articles = await Article.find({ author: userId }).populate('author', 'fullName avatar');
  return articles;
};

export const removeArticle = async (id, userId) => {
  try {
    const article = await Article.findById(id);

    if (!article) {
      console.log('Article not found');
      return false;
    }

    if (article.author.toString() !== userId.toString()) {
      throw new Error('Unauthorized to delete this article');
    }

    if (article.previewImage) {
      const previewFileName = article.previewImage.split('/').pop().split('?')[0];
      await deleteFile(previewFileName);
    }
    if (article.images && article.images.length > 0) {
      await Promise.all(article.images.map(async (imageUrl) => {
        const fileName = imageUrl.split('/').pop().split('?')[0];
        try {
          await deleteFile(fileName);
          console.log(`File ${fileName} deleted from S3`);
        } catch (err) {
          console.error(`Error deleting file ${fileName}:`, err);
        }
      }));
    }

    await User.findByIdAndUpdate(
      article.author,
      { $pull: { articles: article._id } },
      { new: true }
    );

    await article.deleteOne();
    console.log(`Article ${id} deleted successfully`);
    return true;
  } catch (error) {
    console.error('Error in removeArticle:', error);
    throw error;
  }
};

export const updateExistingArticle = async (id, articleData, files, userId) => {
  const { title, description, content, tags } = articleData;
  const article = await Article.findById(id);

  if (!article) {
    return null;
  }

  if (article.author.toString() !== userId.toString()) {
    throw new Error('Unauthorized to update this article');
  }

  if (title) article.title = title;
  if (description) article.description = description;
  if (content) article.content = content;
  if (tags) article.tags = tags;

  if (files && files.length > 0) {
    if (article.previewImage) {
      const oldPreviewFileName = article.previewImage.split('/').pop().split('?')[0];
      await deleteFile(oldPreviewFileName);
    }
    const newPreviewFileName = `articles/${userId}/${Date.now()}-preview-${files[0].originalname}`;
    await uploadFile(files[0].buffer, newPreviewFileName, files[0].mimetype);
    article.previewImage = await getFileUrl(newPreviewFileName);

    for (let i = 1; i < files.length; i++) {
      const file = files[i];
      const newImageFileName = `articles/${userId}/${Date.now()}-img-${file.originalname}`;
      await uploadFile(file.buffer, newImageFileName, file.mimetype);
      const url = await getFileUrl(newImageFileName);
      article.images.push(url);
    }
  }

  await article.save();
  return article;
};