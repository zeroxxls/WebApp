/* global Buffer */
import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  type: { type: String, enum: ['github', 'facebook', 'instagram', 'website', 'other'] },
  name: String,
  url: String,
  isPublic: { type: Boolean, default: true }
});

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  passwordHash: { type: String, required: true },
  bio: { type: String, default: '' },
  techStack: [{ type: String }],
  contacts: [contactSchema],
  avatar: {
    data: Buffer,
    contentType: String
  },
  works: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Work' }],
  likedWorks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Work', default: [] }], // Добавлено поле
  savedWorks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Work', default: [] }]
}, { timestamps: true });

export default mongoose.model('User', userSchema);