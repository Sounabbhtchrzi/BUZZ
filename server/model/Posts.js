import mongoose from 'mongoose'; // Use import instead of require
const { Schema } = mongoose;

// Comment Schema
const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
        trim: true,
    },
    userId: {
        type: String,
        required: true,
    },
}, { timestamps: true }); // Add timestamps option

// Like Schema
const likeSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
}, { timestamps: true }); // Add timestamps option

// Post Schema
const postSchema = new Schema({
    content: {
        type: String,
        required: true,
        trim: true,
    },
    userId: {
        type: String,
        required: true,
    },
    comments: [commentSchema],
    likes: [likeSchema],
}, { timestamps: true }); // Add timestamps option

// Theme Post Schema with expiration
const themePostSchema = new Schema({
    content: {
        type: String,
        required: true,
        trim: true,
    },
    userId: {
        type: String,
        required: true,
    },
    comments: [commentSchema],
    likes: [likeSchema],
    createdAt: {
        type: Date,
        default: Date.now,
        
    },
}, { timestamps: true });

// Model definitions
const ThemePost = mongoose.model('ThemePost', themePostSchema);
const Post = mongoose.model('Post', postSchema);

export { Post, ThemePost };
