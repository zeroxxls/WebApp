import express from 'express';
import {
    uploadWork,
    getWorks,
    getWorkById,
    updateWork,
    deleteWork,
    getUserWorks,
    streamWorkFile,
} from '../controllers/workController.js';
import  {authMiddleware }  from '../middlewares/authMiddleware.js';
import { uploadFiles } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post('/upload', authMiddleware , uploadFiles('files'), uploadWork);
router.get('/', getWorks);
router.get('/user/:userId', getUserWorks);
router.get('/file', streamWorkFile);
router.get('/:id', getWorkById);
router.put('/:id', authMiddleware , uploadFiles('files'), updateWork);
router.delete('/:id', authMiddleware , deleteWork);

export default router;
