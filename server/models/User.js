/* global Buffer */
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  avatar: {
    data: { 
      type: Buffer, // Бинарные данные изображения
      required: false 
    },
    contentType: { 
      type: String, // MIME-тип (image/jpeg, image/png и т.д.)
      required: false
    }
  },
  bio: String,
  worksCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

export default mongoose.model('User', UserSchema);