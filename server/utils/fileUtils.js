import path from 'path';
import { uploadFile, deleteFile, getFileUrl } from '../services/s3Service.js';

export const saveFileToS3 = async (file, workId) => {
  const fileExt = path.extname(file.originalname).toLowerCase();
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const fileName = `works/${workId}/${uniqueSuffix}${fileExt}`;

  try {
    await uploadFile(file.buffer, fileName, file.mimetype);
    return {
      path: fileName,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
    };
  } catch (err) {
    console.error('Error uploading file to S3:', err);
    throw err;
  }
};

export const saveFilesToS3 = async (files, workId) => {
  const savedFiles = [];
  for (const file of files) {
    try {
      const savedFile = await saveFileToS3(file, workId);
      savedFiles.push(savedFile);
    } catch (err) {
      await Promise.all(savedFiles.map(f => deleteFile(f.path).catch(e => console.error(e))));
      throw err;
    }
  }
  return savedFiles;
};

export const getFileUrls = async (files) => {
  return Promise.all(files.map(async file => {
    const url = await getFileUrl(file.path);
    return { ...file.toObject(), url };
  }));
};