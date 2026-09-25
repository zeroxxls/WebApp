import multer from 'multer';
import path from 'path';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const mimeType = file.mimetype.toLowerCase();
    const allowedExtensions = new Set([
        '.jpg', '.jpeg', '.png', '.webp', '.gif', '.mp4', '.mov', '.avi',
        '.zip', '.rar', '.obj', '.fbx', '.blend', '.glb', '.gltf'
    ]);
    const allowedMimeTypes = new Set([
        'image/jpeg', 'image/png', 'image/webp', 'image/gif',
        'video/mp4', 'video/quicktime', 'video/x-msvideo',
        'application/zip', 'application/x-rar-compressed',
        'application/octet-stream', 'model/obj', 'model/gltf+json',
        'model/gltf-binary', 'application/x-blender', 'text/plain'
    ]);
    const genericBinaryFile = mimeType === 'application/octet-stream'
        && ['.zip', '.rar', '.obj', '.fbx', '.blend', '.glb', '.gltf'].includes(extension);

    if (allowedExtensions.has(extension) && (allowedMimeTypes.has(mimeType) || genericBinaryFile)) {
        return cb(null, true);
    }
    cb(new Error('Only image, video, 3D model, and archive files are allowed'));
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 100 * 1024 * 1024, 
        files: 15
    }
});

export default upload;
