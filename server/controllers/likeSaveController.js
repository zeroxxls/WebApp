import {
  likeWorkService,
  unlikeWorkService,
  saveWorkService,
  unsaveWorkService,
  getLikedWorksService,
  getSavedWorksService
} from '../services/likeSaveService.js';

export const likeWork = async (req, res) => {
  try {
    const likedWorks = await likeWorkService(req.params.userId, req.params.workId);
    res.json({ likedWorks });
  } catch (error) {
    console.error(error);
    res.status(error.message === 'User not found' ? 404 : 500).json({ message: error.message });
  }
};

export const unlikeWork = async (req, res) => {
  try {
    const likedWorks = await unlikeWorkService(req.params.userId, req.params.workId);
    res.json({ likedWorks });
  } catch (error) {
    console.error(error);
    res.status(error.message === 'User not found' ? 404 : 500).json({ message: error.message });
  }
};

export const saveWork = async (req, res) => {
  try {
    const savedWorks = await saveWorkService(req.params.userId, req.params.workId);
    res.json({ savedWorks });
  } catch (error) {
    console.error(error);
    res.status(error.message === 'User not found' ? 404 : 500).json({ message: error.message });
  }
};

export const unsaveWork = async (req, res) => {
  try {
    const savedWorks = await unsaveWorkService(req.params.userId, req.params.workId);
    res.json({ savedWorks });
  } catch (error) {
    console.error(error);
    res.status(error.message === 'User not found' ? 404 : 500).json({ message: error.message });
  }
};

export const getLikedWorks = async (req, res) => {
  try {
    const likedWorks = await getLikedWorksService(req.params.userId);
    res.json({ likedWorks });
  } catch (error) {
    console.error(error);
    res.status(error.message === 'User not found' ? 404 : 500).json({ message: error.message });
  }
};

export const getSavedWorks = async (req, res) => {
  try {
    const savedWorks = await getSavedWorksService(req.params.userId);
    res.json({ savedWorks });
  } catch (error) {
    console.error(error);
    res.status(error.message === 'User not found' ? 404 : 500).json({ message: error.message });
  }
};