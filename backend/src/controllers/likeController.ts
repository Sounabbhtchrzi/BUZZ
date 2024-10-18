import { Request, Response } from 'express';
import Post from '../model/Posts';  

export const likePost = async (req: Request, res: Response): Promise<Response> => {
  const { postId } = req.params;
  const userId = req.cookies.userId;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const likeIndex = post.likes.findIndex(like => like.userId === userId);
    if (likeIndex !== -1) {
      post.likes.splice(likeIndex, 1);
      await post.save();
      return res.status(200).json({ message: 'Post disliked', post });
    } else {
      post.likes.push({
        userId,
        createdAt: new Date(),
      });
      await post.save();
      return res.status(200).json({ message: 'Post liked successfully', post });
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};



export const addComment = async (req: Request, res: Response): Promise<Response> => {
    const { postId } = req.params; 
    const { content } = req.body;  
    const userId = req.cookies.userId;
  
    if (!content || !userId) {
      return res.status(400).json({ message: 'Content and userId are required' });
    }

    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      const newComment = {
        content: content,
        userId: userId,
        createdAt: new Date(),
      };
  
      post.comments.push(newComment);
  
      await post.save();
  
      return res.status(201).json({ message: 'Comment added successfully', post });
    } catch (error) {
      console.error('Error adding comment:', error);
      return res.status(500).json({ message: 'Server error', error });
    }
  };