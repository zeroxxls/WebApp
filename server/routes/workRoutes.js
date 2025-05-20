import express from 'express';
import {
    uploadWork,
    getWorks,
    getWorkById,
    updateWork,
    deleteWork
} from '../controllers/workController.js';
import  {authMiddleware }  from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post('/upload', authMiddleware , upload.array('files'), uploadWork);
router.get('/', getWorks);
router.get('/:id', getWorkById);
router.put('/:id', authMiddleware , upload.array('files'), updateWork);
router.delete('/:id', authMiddleware , deleteWork);

export default router;