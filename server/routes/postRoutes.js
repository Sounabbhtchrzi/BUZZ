import express from 'express';
import { createPost , getPosts} from '../controllers/postController.js';
import { addComment, likePost } from '../controllers/likeController.js';
import { createThemePost , getThemePosts , likeThemePost , addThemeComment, clearPreviousPosts } from '../controllers/themeController.js';

const router = express.Router();

router.get('/',getPosts); 
router.post('/create', createPost); 

router.post('/like/:postId', likePost);
router.post('/comment/:postId', addComment);

router.get('/theme',getThemePosts);
router.post('/theme/create', createThemePost);
router.post('/theme/like/:postId',likeThemePost);
router.post('/theme/comment/:postId',addThemeComment);
router.delete('/theme/clear',clearPreviousPosts);

export default router;
