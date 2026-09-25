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
    const likedWorks = await likeWorkService(req.user._id, req.params.workId);
    res.json({ likedWorks });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || (error.message === 'User not found' ? 404 : 500)).json({ message: error.statusCode ? error.message : 'Failed to update like' });
  }
};

export const unlikeWork = async (req, res) => {
  try {
    const likedWorks = await unlikeWorkService(req.user._id, req.params.workId);
    res.json({ likedWorks });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || (error.message === 'User not found' ? 404 : 500)).json({ message: error.statusCode ? error.message : 'Failed to update like' });
  }
};

export const saveWork = async (req, res) => {
  try {
    const savedWorks = await saveWorkService(req.user._id, req.params.workId);
    res.json({ savedWorks });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || (error.message === 'User not found' ? 404 : 500)).json({ message: error.statusCode ? error.message : 'Failed to update saved work' });
  }
};

export const unsaveWork = async (req, res) => {
  try {
    const savedWorks = await unsaveWorkService(req.user._id, req.params.workId);
    res.json({ savedWorks });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || (error.message === 'User not found' ? 404 : 500)).json({ message: error.statusCode ? error.message : 'Failed to update saved work' });
  }
};

export const getLikedWorks = async (req, res) => {
  try {
    const likedWorks = await getLikedWorksService(req.user._id);
    res.json({ likedWorks });
  } catch (error) {
    console.error(error);
    res.status(error.message === 'User not found' ? 404 : 500).json({ message: error.message === 'User not found' ? error.message : 'Failed to get liked works' });
  }
};

export const getSavedWorks = async (req, res) => {
  try {
    const savedWorks = await getSavedWorksService(req.user._id);
    res.json({ savedWorks });
  } catch (error) {
    console.error(error);
    res.status(error.message === 'User not found' ? 404 : 500).json({ message: error.message === 'User not found' ? error.message : 'Failed to get saved works' });
  }
};
