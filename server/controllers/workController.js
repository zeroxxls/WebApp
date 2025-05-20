import process from 'node:process';
import Work from '../models/Work.js';
import User from '../models/User.js';
import path from 'path';
import fs from 'fs';

// Helper function to save files
const saveFiles = async (files, workId) => {
    const uploadDir = path.join(process.cwd(), 'uploads', 'works', workId.toString());
    
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const savedFiles = [];
    
    for (const file of files) {
        const fileExt = path.extname(file.originalname);
        const fileName = `${Date.now()}${fileExt}`;
        const filePath = path.join(uploadDir, fileName);
        
        fs.writeFileSync(filePath, file.buffer);
        
        savedFiles.push({
            path: path.join('works', workId.toString(), fileName),
            originalName: file.originalname,
            mimeType: file.mimetype
        });
    }
    
    return savedFiles;
};

export const uploadWork = async (req, res) => {
    try {
        const { description, price, filters, technologies, authorId } = req.body;
        
        // Create work first to get ID for file paths
        const work = new Work({
            description,
            price: parseFloat(price),
            filters: JSON.parse(filters),
            technologies: JSON.parse(technologies),
            author: authorId
        });

        await work.save();
        
        // Save files and update work with file paths
        if (req.files && req.files.length > 0) {
            const savedFiles = await saveFiles(req.files, work._id);
            work.files = savedFiles;
            await work.save();
        }

        // Update user's works
        await User.findByIdAndUpdate(authorId, {
            $push: { works: work._id }
        });

        res.status(201).json({
            success: true,
            work
        });
    } catch (error) {
        console.error('Error uploading work:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to upload work',
            error: error.message
        });
    }
};

export const getWorks = async (req, res) => {
    try {
        const works = await Work.find().populate('author', 'name avatar');
        res.json({ success: true, works });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch works',
            error: error.message
        });
    }
};

export const getWorkById = async (req, res) => {
    try {
        const work = await Work.findById(req.params.id).populate('author', 'name avatar');
        if (!work) {
            return res.status(404).json({
                success: false,
                message: 'Work not found'
            });
        }
        res.json({ success: true, work });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch work',
            error: error.message
        });
    }
};

export const updateWork = async (req, res) => {
    try {
        // Similar to upload but with updates
        // Implementation depends on your requirements
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update work',
            error: error.message
        });
    }
};

export const deleteWork = async (req, res) => {
    try {
        // Implementation depends on your requirements
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete work',
            error: error.message
        });
    }
};