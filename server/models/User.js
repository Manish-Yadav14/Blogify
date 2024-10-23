const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  blogId : {type:String,required:true,unique:true},
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isPublished: {type:Boolean,default:false},
  trashed :{type:Boolean,default:false},
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Store hashed password
  createdAt: { type: Date, default: Date.now },
  fullName:{type:String},
  slug:{type:String},
  linkedin: {type:String},
  twitter :{type:String},
  bio:{type:String},
  blogs: [blogSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
