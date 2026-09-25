export const requireSelfUser = (req, res, next) => {
  if (req.user?._id?.toString() !== req.params.userId) {
    return res.status(403).json({ success: false, message: 'You can only access your own private data' });
  }
  next();
};
