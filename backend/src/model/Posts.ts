import mongoose, { Document, model, Schema } from 'mongoose';

// Interface for Comment
interface IComment {
    content: string;
    userId: string; 
    createdAt?: Date;
    updatedAt?: Date;  // Add updatedAt for comments
}

// Interface for Like
interface ILike {
    userId: string; 
    createdAt?: Date;
    updatedAt?: Date;  // Add updatedAt for likes
}

// Interface for Post
interface IPost extends Document {
    content: string;
    userId: string; 
    createdAt?: Date;
    updatedAt?: Date;  // Add updatedAt for posts
    comments: IComment[];
    likes: ILike[];
}

interface IThemePost extends Document {
    content: string;
    userId: string; 
    createdAt?: Date;
    updatedAt?: Date;  
    comments: IComment[];
    likes: ILike[];
}

// Comment Schema
const commentSchema = new Schema<IComment>({
    content: {
        type: String,
        required: true,
        trim: true,
    },
    userId: {
        type: String,
        required: true,
    },
}, { timestamps: true }); 

// Like Schema
const likeSchema = new Schema<ILike>({
    userId: {
        type: String, 
        required: true,
    },
}, { timestamps: true }); // Add timestamps option

// Post Schema
const postSchema = new Schema<IPost>({
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

const themePostSchema = new Schema<IThemePost>({
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
        expires: '1d', // Automatically delete after 1 day
    },
}, { timestamps: true });

const ThemePost = mongoose.model<IThemePost>('ThemePost', themePostSchema);
const Post = mongoose.model<IPost>('Post', postSchema);

export { Post, ThemePost };
