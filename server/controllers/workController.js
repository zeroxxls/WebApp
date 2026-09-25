import {
  fetchUserWorks,
  createWork,
  fetchAllWorks,
  fetchWorkById,
  removeWork,
  updateExistingWork,
} from '../services/workService.js';
import Work from '../models/Work.js';
import { getFileStream } from '../services/s3Service.js';

export const streamWorkFile = async (req, res) => {
  const filePath = req.query.path;
  if (typeof filePath !== 'string') {
    return res.status(400).json({ success: false, message: 'A work file path is required' });
  }

  try {
    const work = await Work.findOne({ 'files.path': filePath }).select('files');
    const file = work?.files.find(({ path }) => path === filePath);
    if (!file) {
      return res.status(404).json({ success: false, message: 'Work file not found' });
    }

    const { Body, ContentType, ContentLength } = await getFileStream(file.path);
    res.set({
      'Content-Type': ContentType || file.mimeType || 'application/octet-stream',
      'Content-Disposition': 'inline',
      'Cache-Control': 'private, max-age=3600',
    });
    if (ContentLength) res.set('Content-Length', String(ContentLength));
    Body.pipe(res);
  } catch (error) {
    console.error('Error streaming work file:', error);
    res.status(500).json({ success: false, message: 'Failed to stream work file' });
  }
};

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
    const success = await removeWork(req.params.id, req.user._id);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Work not found' });
    }
    res.json({ success: true, message: 'Work deleted successfully' });
  } catch (error) {
    const status = error.message === 'Unauthorized to delete this work' ? 403 : 500;
    res.status(status).json({ success: false, message: error.message });
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
    const status = err.message === 'Unauthorized to update this work' ? 403 : 500;
    res.status(status).json({ success: false, message: err.message });
  }
};
