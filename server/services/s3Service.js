import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dotenv from 'dotenv';
import process from 'node:process';

dotenv.config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const bucketName = process.env.AWS_BUCKET_NAME;

export const uploadFile = async (fileBuffer, fileName, mimetype) => {
  const uploadParams = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileBuffer,
    ContentType: mimetype,
  };

  try {
    await s3Client.send(new PutObjectCommand(uploadParams));
    return fileName;
  } catch (err) {
    console.error('Error uploading file:', err);
    throw err;
  }
};

export const deleteFile = async (fileName) => {
  const deleteParams = {
    Bucket: bucketName,
    Key: fileName,
  };

  try {
    await s3Client.send(new DeleteObjectCommand(deleteParams));
  } catch (err) {
    console.error('Error deleting file:', err);
    throw err;
  }
};

export const getFileUrl = async (fileName) => {
  const getObjectParams = {
    Bucket: bucketName,
    Key: fileName,
  };

  try {
    // Generate a presigned URL that's valid for 1 hour
    const url = await getSignedUrl(s3Client, new GetObjectCommand(getObjectParams), {
      expiresIn: 3600,
    });
    return url;
  } catch (err) {
    console.error('Error generating file URL:', err);
    throw err;
  }
};