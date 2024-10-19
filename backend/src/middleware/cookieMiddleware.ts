import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

const cookieMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Check if the UUID cookie exists
    const userId = req.cookies.userId;

    if (!userId) {
        // Generate a new UUID and set it in a cookie
        const newUserId = uuidv4();
        res.cookie('userId', newUserId, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }); // Cookie expires in 30 days
    }

    next();
};

export default cookieMiddleware;
