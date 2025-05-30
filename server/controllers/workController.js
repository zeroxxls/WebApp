import {
  fetchUserWorks,
  createWork,
  fetchAllWorks,
  fetchWorkById,
  removeWork,
  updateExistingWork,
} from '../services/workService.js';

export const getUserWorks = async (req, res) => {
  try {
    console.log("Fetching user works for user ID:", req.params.userId);
    const works = await fetchUserWorks(req.params.userId);
    res.json({ success: true, works });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch user works', error: error.message });
  }
};

export const uploadWork = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }
    const work = await createWork(req.files, req.body, req.user._id);
    res.status(201).json({ success: true, message: 'Work uploaded successfully', work });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, message: 'Failed to upload work', error: error.message });
  }
};

export const getWorks = async (req, res) => {
  try {
    const works = await fetchAllWorks();
    res.json({ success: true, works });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch works', error: error.message });
  }
};

export const getWorkById = async (req, res) => {
  try {
    const work = await fetchWorkById(req.params.id);
    if (!work) {
      return res.status(404).json({ success: false, message: 'Work not found' });
    }
    res.json({ success: true, work });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch work', error: error.message });
  }
};

export const deleteWork = async (req, res) => {
  try {
    const success = await removeWork(req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Work not found' });
    }
    res.json({ success: true, message: 'Work deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete work', error: error.message });
  }
};

export const updateWork = async (req, res) => {
  try {
    const work = await updateExistingWork(req.params.id, req.body, req.files, req.user._id);
    if (!work) {
      return res.status(404).json({ success: false, message: 'Work not found' });
    }
    res.json({ success: true, work });
  } catch (err) {
    console.error('Error updating work:', err);
    res.status(500).json({ success: false, message: 'Failed to update work', error: err.message });
  }
};
