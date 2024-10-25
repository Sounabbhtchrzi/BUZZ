import dotenv from 'dotenv';
dotenv.config();
import { Post } from '../model/Posts.js'; // Adjust the import as needed
import { google } from 'googleapis';

const API_KEY = process.env.PERSPECTIVE_API_KEY;

const DISCOVERY_URL =
    'https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1';

const analyzeComment = async (comment) => {
    const client = await google.discoverAPI(DISCOVERY_URL);
    
    const analyzeRequest = {
        comment: {
            text: comment,
        },
        requestedAttributes: {
                TOXICITY: {},
                SEVERE_TOXICITY: {}, 
                THREAT: {},
                INSULT: {}, 
                PROFANITY: {}, 
      },
    };

    try {
        const response = await client.comments.analyze({
            key: API_KEY,
            resource: analyzeRequest,
        });
        
        return {
            toxicityScore: response.data.attributeScores.TOXICITY.summaryScore.value,
            severeToxicityScore: response.data.attributeScores.SEVERE_TOXICITY.summaryScore.value,
            insultScore: response.data.attributeScores.INSULT.summaryScore.value,
            threatScore: response.data.attributeScores.THREAT.summaryScore.value,
            profanityScore: response.data.attributeScores.PROFANITY.summaryScore.value,
        }; 
    } catch (error) {
      throw new Error("Error analyzing comment");
    }  
};

export const createPost = async (req, res, next) => {
    const { content } = req.body;
    const userId = req.cookies.userId; // Retrieve the UUID from the cookie

    // Analyze the content for toxicity
    try {
        const scores = await analyzeComment(content);

 // Set relaxed thresholds for each attribute

         if (
            scores.toxicityScore > 0.5 ||
            scores.severeToxicityScore > 0.3 ||
            scores.insultScore > 0.4 ||
            scores.threatScore > 0.1 ||
            scores.profanityScore > 0.4 
          ) { 
            return res.status(400).json({ message: 'Your post is considered inappropriate.' });
        }

        const newPost = new Post({
            content,
            userId,
            comments: [],
            likes: [],
        });

        await newPost.save();
        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        next(error); 
    }
};

export const getPosts = async (req, res, next) => {
    try {
        // Fetch all posts from the database
        const posts = await Post.find();
        
        // Send the posts back to the client
        res.status(200).json(posts);
    } catch (error) {
        next(error); // Pass the error to the next middleware
    }
};
