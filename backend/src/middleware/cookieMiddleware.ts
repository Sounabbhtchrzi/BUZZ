import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

const cookieMiddleware = (req: Request, res: Response, next: NextFunction) => {
        const userId = req.cookies.userId;
    
        if (!userId) {
            const newUserId = uuidv4();
            res.cookie('userId', newUserId, {
                maxAge: 30 * 24 * 60 * 60 * 1000,  // 30 days
                httpOnly: true,                     // Prevents access via JavaScript
                secure: process.env.NODE_ENV === 'production',  // Only send over HTTPS in production
                sameSite: 'strict',                 // Protect against CSRF attacks
            });
        }
    
        next();
    };
    

export default cookieMiddleware;
