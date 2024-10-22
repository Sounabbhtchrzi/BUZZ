import {ThemePost} from '../model/Posts.js'; // Adjust the import as needed

export const createThemePost = async (req, res, next) => {
    const { content } = req.body;
    const userId = req.cookies.userId; // Retrieve the UUID from the cookie

    const newPost = new ThemePost({
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

export const getThemePosts = async (req, res, next) => {
    try {
        
        const posts = await ThemePost.find();
        
        // Send the posts back to the client
        res.status(200).json(posts);
    } catch (error) {
        next(error); 
    }
};



export const likeThemePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.cookies.userId;

  try {
    const post = await ThemePost.findById(postId);
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return; 
    }
    
    const likeIndex = post.likes.findIndex(like => like.userId === userId);
    if (likeIndex !== -1) {
     
      post.likes.splice(likeIndex, 1);
      await post.save();
      res.status(200).json({ message: 'Post disliked', post }); 
    } else {
     
      post.likes.push({
        userId,
        createdAt: new Date(),
      });
      await post.save();
      res.status(200).json({ message: 'Post liked successfully', post }); 
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({ message: 'Server error', error }); 
  }
};



export const addThemeComment = async (req, res) => {
    const { postId } = req.params; 
    const { content } = req.body;  
    const userId = req.cookies.userId;

    if (!content || !userId) {
        res.status(400).json({ message: 'Content and userId are required' });
        return; 
    }

    try {
        const post = await ThemePost.findById(postId);
        if (!post) {
            res.status(404).json({ message: 'Post not found' });
            return; 
        }
  
        const newComment = {
            content: content,
            userId: userId,
            createdAt: new Date(),
        };
  
        post.comments.push(newComment);
  
        await post.save();
  
        res.status(201).json({ message: 'Comment added successfully', post });
        return; 
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Server error', error });
        return; 
    }
};

export const clearPreviousPosts = async ( res) => {
    try {
      
  
      // Delete the theme-related posts
      const result = await ThemePost.deleteMany({});
  
      // Check if any posts were deleted
      if (result.deletedCount > 0) {
        res.status(200).send('Previous theme posts cleared.');
      } else {
        res.status(404).send('No theme posts found to clear.');
      }
    } catch (err) {
      console.error('Error clearing posts:', err);
      res.status(500).send('Server error.');
    }
  };
