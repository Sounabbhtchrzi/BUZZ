import mongoose, { Document, model, Schema, Types } from 'mongoose';


interface IComment {
    content: string;
    userId: string; 
    createdAt?: Date;
  }
  

  interface ILike {
    userId: string; 
    createdAt?: Date;
  }
  

  interface IPost extends Document {
    title?: string;
    content: string;
    image?: string; 
    userId: string; 
    createdAt?: Date;
    comments: IComment[];
    likes: ILike[];
  }
  
  
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
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  

  const likeSchema = new Schema<ILike>({
    userId: {
      type: String, 
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  
  const postSchema = new Schema<IPost>({
    title: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String, 
      trim: true,
      default: null,
    },
    userId: {
      type: String, 
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    comments: [commentSchema], 
    likes: [likeSchema],      
  });
  
 
  const Post = mongoose.model<IPost>('Post', postSchema);
  
  export default Post;