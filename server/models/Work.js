import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    path: { type: String, required: true },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true }
}, { _id: false });

const workSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    filters: { type: [String], required: true },
    technologies: { type: [String], required: true },
    files: { type: [fileSchema], required: true },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        default: function() { return this.author; }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

workSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Work = mongoose.model('Work', workSchema);

export default Work;