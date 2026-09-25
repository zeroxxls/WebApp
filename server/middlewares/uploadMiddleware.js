import multer from 'multer';
import path from 'path';

const MAX_IMAGE_VIDEO_SIZE = 30 * 1024 * 1024;
const MAX_MODEL_SIZE = 50 * 1024 * 1024;
const MAX_TOTAL_UPLOAD_SIZE = 100 * 1024 * 1024;
const modelExtensions = new Set(['.zip', '.rar', '.obj', '.fbx', '.blend', '.glb', '.gltf']);
const totalUploadBytes = Symbol('totalUploadBytes');

const storage = {
    _handleFile(req, file, callback) {
        const chunks = [];
        let size = 0;
        let exceededLimit = false;
        req[totalUploadBytes] ??= 0;

        file.stream.on('data', chunk => {
            size += chunk.length;
            req[totalUploadBytes] += chunk.length;
            if (size > file.maxFileSize || req[totalUploadBytes] > MAX_TOTAL_UPLOAD_SIZE) {
                exceededLimit = true;
                chunks.length = 0;
                return;
            }
            if (!exceededLimit) chunks.push(chunk);
        });

        file.stream.on('error', callback);
        file.stream.on('end', () => {
            if (exceededLimit) {
                const error = new multer.MulterError('LIMIT_FILE_SIZE', file.fieldname);
                error.message = req[totalUploadBytes] > MAX_TOTAL_UPLOAD_SIZE
                    ? 'Total upload exceeds the 100 MB request limit'
                    : `File exceeds the ${file.maxFileSize / (1024 * 1024)} MB limit`;
                return callback(error);
            }

            callback(null, { buffer: Buffer.concat(chunks), size });
        });
    },

    _removeFile(req, file, callback) {
        delete file.buffer;
        delete file.size;
        callback(null);
    },
};

const fileFilter = (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const mimeType = file.mimetype.toLowerCase();
    const allowedExtensions = new Set(['.jpg', '.jpeg', '.png', '.gif', '.mp4', ...modelExtensions]);
    const mimeTypesByExtension = {
        '.jpg': new Set(['image/jpeg']),
        '.jpeg': new Set(['image/jpeg']),
        '.png': new Set(['image/png']),
        '.gif': new Set(['image/gif']),
        '.mp4': new Set(['video/mp4']),
        '.zip': new Set(['application/zip', 'application/x-zip-compressed', 'application/octet-stream']),
        '.rar': new Set(['application/x-rar-compressed', 'application/vnd.rar', 'application/octet-stream']),
        '.obj': new Set(['model/obj', 'text/plain', 'application/octet-stream']),
        '.fbx': new Set(['application/octet-stream', 'application/x-fbx']),
        '.blend': new Set(['application/x-blender', 'application/octet-stream']),
        '.glb': new Set(['model/gltf-binary', 'application/octet-stream']),
        '.gltf': new Set(['model/gltf+json', 'text/plain', 'application/octet-stream']),
    };

    if (allowedExtensions.has(extension) && mimeTypesByExtension[extension]?.has(mimeType)) {
        file.maxFileSize = modelExtensions.has(extension) ? MAX_MODEL_SIZE : MAX_IMAGE_VIDEO_SIZE;
        return cb(null, true);
    }
    cb(new Error('Only image, video, 3D model, and archive files are allowed'));
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: MAX_MODEL_SIZE,
        files: 15
    }
});

export const uploadFiles = (fieldName) => (req, res, next) => {
    upload.array(fieldName)(req, res, error => {
        if (!error) return next();

        const tooLarge = error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE';
        return res.status(tooLarge ? 413 : 400).json({
            success: false,
            message: tooLarge ? error.message : 'Invalid upload',
        });
    });
};

export default upload;
