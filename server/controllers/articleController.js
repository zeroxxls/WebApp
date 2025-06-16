import Article from '../models/Article.js';
import User from '../models/User.js';
import { uploadFile, deleteFile, } from '../services/s3Service.js';

export const createArticle = async (req, res) => {
  try {
    const { title, description, content, tags } = req.body;
    const files = req.files;
    
    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    // Upload preview image
    const previewImageUrl = await uploadFile(
      files[0].buffer, 
      `articles/${req.user._id}/${Date.now()}-preview-${files[0].originalname}`,
      files[0].mimetype
    );

    // Upload additional images
    const imageUrls = [];
    for (let i = 1; i < files.length; i++) {
      const file = files[i];
      const url = await uploadFile(
        file.buffer,
        `articles/${req.user._id}/${Date.now()}-${file.originalname}`,
        file.mimetype
      );
      imageUrls.push(url);
    }

    // Create article
    const article = new Article({
      title,
      description,
      content,
      previewImage: previewImageUrl,
      images: imageUrls,
      author: req.user._id,
      tags: tags ? JSON.parse(tags) : []
    });

    const savedArticle = await article.save();
    
    // Update user's articles
    await User.findByIdAndUpdate(req.user._id, { 
      $push: { articles: savedArticle._id } 
    });

    return res.status(201).json(savedArticle);
  } catch (error) {
    console.error('Error creating article:', error);
    return res.status(500).json({ message: 'Failed to create article', error: error.message });
  }
};

export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find()
      .populate('author', 'fullName avatar')
      .sort({ createdAt: -1 });
    return res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return res.status(500).json({ message: 'Failed to fetch articles', error: error.message });
  }
};

export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate('author', 'fullName avatar')
      .populate('comments');
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    return res.json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    return res.status(500).json({ message: 'Failed to fetch article', error: error.message });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    if (article.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized to update this article' });
    }

    // Update fields
    article.title = req.body.title || article.title;
    article.description = req.body.description || article.description;
    article.content = req.body.content || article.content;
    article.tags = req.body.tags ? JSON.parse(req.body.tags) : article.tags;

    // Handle file updates
    if (req.files && req.files.length > 0) {
      // Delete old preview image
      if (article.previewImage) {
        const oldFileName = article.previewImage.split('/').pop().split('?')[0];
        await deleteFile(oldFileName);
      }

      // Upload new preview image
      article.previewImage = await uploadFile(
        req.files[0].buffer,
        `articles/${req.user._id}/${Date.now()}-preview-${req.files[0].originalname}`,
        req.files[0].mimetype
      );

      // Upload additional images
      for (let i = 1; i < req.files.length; i++) {
        const file = req.files[i];
        const url = await uploadFile(
          file.buffer,
          `articles/${req.user._id}/${Date.now()}-${file.originalname}`,
          file.mimetype
        );
        article.images.push(url);
      }
    }

    await article.save();
    return res.json(article);
  } catch (error) {
    console.error('Error updating article:', error);
    return res.status(500).json({ message: 'Failed to update article', error: error.message });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    if (article.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized to delete this article' });
    }

    // Delete files from S3
    if (article.previewImage) {
      const fileName = article.previewImage.split('/').pop().split('?')[0];
      await deleteFile(fileName);
    }

    if (article.images && article.images.length > 0) {
      await Promise.all(article.images.map(async (imageUrl) => {
        const fileName = imageUrl.split('/').pop().split('?')[0];
        await deleteFile(fileName);
      }));
    }

    // Remove from user's articles
    await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { articles: article._id } }
    );

    await article.deleteOne();
    return res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    return res.status(500).json({ message: 'Failed to delete article', error: error.message });
  }
};

export const getUserArticles = async (req, res) => {
  try {
    const articles = await Article.find({ author: req.params.userId })
      .populate('author', 'fullName avatar')
      .sort({ createdAt: -1 });
    return res.json(articles);
  } catch (error) {
    console.error('Error fetching user articles:', error);
    return res.status(500).json({ message: 'Failed to fetch user articles', error: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    if (!text || text.trim() === '') {
      return res.status(400).json({ message: 'Comment text cannot be empty' });
    }

    const newComment = {
      text,
      author: req.user._id,
      createdAt: new Date()
    };

    article.comments.push(newComment);
    await article.save();

    return res.status(201).json({ 
      success: true, 
      message: 'Comment added', 
      comment: newComment 
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    return res.status(500).json({ 
      message: 'Failed to add comment', 
      error: error.message 
    });
  }
};