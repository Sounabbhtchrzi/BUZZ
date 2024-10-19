import express from 'express';
import { createPost , getPosts} from '../controllers/postController';
import { addComment, likePost } from '../controllers/likeController';

const router = express.Router();

router.get('/',getPosts); 
router.post('/create', createPost); 

router.post('/like/:postId', likePost);
router.post('/comment/:postId', addComment);

export default router;
