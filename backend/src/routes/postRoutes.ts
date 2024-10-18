import express from 'express';
import { createPost , getPosts} from '../controllers/postController';

const router = express.Router();

router.get('/',getPosts); 
router.post('/create', createPost); 

export default router;
