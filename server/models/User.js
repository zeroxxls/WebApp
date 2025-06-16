/* global Buffer */
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

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
  likedWorks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Work', default: [] }],
  savedWorks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Work', default: [] }],
  articles: [{type: mongoose.Schema.Types.ObjectId, ref: 'Article'}],
  likedArticles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article', default: [] }],
  savedArticles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article', default: [] }],
  followers: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    default: [],
    index: true,
    validate: {
      validator: function(v) {
        return mongoose.Types.ObjectId.isValid(v);
      },
      message: props => `${props.value} is not a valid user ID!`
    }
  }],
  following: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    default: [],
    index: true,
    validate: {
      validator: function(v) {
        return mongoose.Types.ObjectId.isValid(v);
      },
      message: props => `${props.value} is not a valid user ID!`
    }
  }]
 }, { timestamps: true });

userSchema.plugin(mongoosePaginate);
userSchema.index({ followers: 1, following: 1 });

export default mongoose.model('User', userSchema);