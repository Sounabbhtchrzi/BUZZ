import { v4 as uuidv4 } from 'uuid';
import VisitorCount from '../model/Visitors.js'; // Adjust the import path based on your project structure

const cookieMiddleware = async (req, res, next) => {
    const userId = req.cookies.userId;

    if (!userId) {
        const newUserId = uuidv4();
        try {
            let visitorCount = await VisitorCount.findOne();
            if (visitorCount) {
                visitorCount.totalUsers += 1; // Increment unique users count
                await visitorCount.save();
            } else {
                // Create a new count entry with totalUsers set to 1
                await VisitorCount.create({ totalUsers: 1 });
            }
        } catch (error) {
            console.error('Error updating visitor count:', error);
        }
        res.cookie('userId', newUserId, {
            maxAge: 30 * 24 * 60 * 60 * 1000,  // 30 days
            httpOnly: true,                   // Prevents access via JavaScript
            secure: process.env.NODE_ENV === 'production',  // Only send over HTTPS in production
            sameSite: 'None',                 // Adjust as needed
        });
    }

    next();
};

export default cookieMiddleware;
