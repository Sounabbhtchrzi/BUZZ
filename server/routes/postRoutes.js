import express from 'express';
import { createPost , getPosts} from '../controllers/postController.js';
import { addComment, likePost } from '../controllers/likeController.js';
import { createThemePost , getThemePosts , likeThemePost , addThemeComment, clearPreviousPosts } from '../controllers/themeController.js';
import { submitFeedback } from '../controllers/feedbackController.js';
import cookieMiddleware from '../middleware/cookieMiddleware.js';
import { groqMessage } from '../controllers/aiController.js';

const router = express.Router();

router.get('/',getPosts); 
router.post('/create',cookieMiddleware, createPost); 

router.post('/like/:postId',cookieMiddleware, likePost);
router.post('/comment/:postId',cookieMiddleware, addComment);

router.get('/theme',getThemePosts);
router.post('/theme/create',cookieMiddleware, createThemePost);
router.post('/theme/like/:postId',cookieMiddleware,likeThemePost);
router.post('/theme/comment/:postId',cookieMiddleware,addThemeComment);
router.delete('/theme/clear',cookieMiddleware,clearPreviousPosts);
router.post('/feedback', submitFeedback);

router.get('/aimessage',groqMessage);

export default router;
