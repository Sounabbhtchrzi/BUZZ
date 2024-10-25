import { main as getGroqData } from '../middleware/groqMiddleware.js';

export const groqMessage = async(req,res) => {
    try {
        const data = await getGroqData();
        res.json({ result: data });
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
      }
};