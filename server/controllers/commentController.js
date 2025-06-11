import Comment from '../models/Comment.js';
import Work from '../models/Work.js';

export const addComment = async (req, res) => {
  try {
    const workId = req.params.workId;
    const { text } = req.body;
    const authorId = req.user._id;

    const work = await Work.findById(workId);
    if (!work) {
      return res.status(404).json({ success: false, message: 'Work not found' });
    }

    const newComment = new Comment({
      text,
      author: authorId,
      work: workId
    });

    const savedComment = await newComment.save();

    const populatedComment = await savedComment.populate('author', 'fullName avatar');

    res.status(201).json(populatedComment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ success: false, message: 'Failed to add comment', error: error.message });
  }
};

export const getCommentsForWork = async (req, res) => {
  try {
    const workId = req.params.workId;
    const comments = await Comment.find({ work: workId }).populate('author', 'fullName avatar').sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    console.error('Error getting comments:', error);
    res.status(500).json({ success: false, message: 'Failed to get comments', error: error.message });
  }
};