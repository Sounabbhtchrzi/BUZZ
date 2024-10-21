import { Request, Response, NextFunction } from 'express';
import {Post} from '../model/Posts'; // Adjust the import as needed

export const createPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { content } = req.body;
    // const userId = req.cookies.userId; // Retrieve the UUID from the cookie
    const userId=123;
    const newPost = new Post({
        content,
        userId, 
        comments: [],
        likes: [],
    });

    try {
        await newPost.save();
        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        next(error); 
    }
};


export const getPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Fetch all posts from the database
        const posts = await Post.find();
        
        // Send the posts back to the client
        res.status(200).json(posts);
    } catch (error) {
        next(error); // Pass the error to the next middleware
    }
};