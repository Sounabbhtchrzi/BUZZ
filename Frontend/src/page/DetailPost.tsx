// import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../component/Navbar";
interface Comment {
    _id: string;
    content: string;
    createdAt: string;
    userId: string; // Assuming userId is part of the comment
}

interface Post {
    _id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    likes: any[]; // Define this more specifically if you have a structure for likes
    comments: Comment[];
    userId: string;
}

const DetailPost = () => {
    const { id } = useParams<{ id: string }>();
    const [backgroundEmojis, setBackgroundEmojis] = useState<string[]>([]);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [post, setPost] = useState<Post | null>(null); // Initialize as null
    const [commentText, setCommentText] = useState("");
    // const [activePostId, setActivePostId] = useState<string | null>(null);
    const [reloadTrigger, setReloadTrigger] = useState(false);
    // const [posts, setPosts] = useState([]);

    const generateAvatarUrl = (seed: string) => {
        return `https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}`;
    };
    useEffect(() => {
        const emojis = ['😀', '😎', '🤪', '🥳', '🚀', '🌈', '🍕', '🎉', '🦄', '🐶', '🌟', '🎸'];
        const newBackgroundEmojis = Array.from({ length: 5000 }, () => emojis[Math.floor(Math.random() * emojis.length)]);
        setBackgroundEmojis(newBackgroundEmojis);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/posts`);
                const posts: Post[] = response.data; // Assuming your API returns an array of posts
                const post = posts.find((p) => p._id === id);
                setPost(post || null); // Set to null if not found
            } catch (err) {
                console.error('Error fetching posts:', err);
            }
        };

        fetchPosts();
    }, [id]); // Include id as a dependency

    const handleLike = async (id: string) => {
        try {
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/posts/like/${id}`, {}, { withCredentials: true });
          if (response.status === 200) {
            // Update the local state with the updated post data
            const updatedPost = response.data.post;
            setPost(() =>
              updatedPost
            );
            setReloadTrigger(!reloadTrigger);
          }
        } catch (err) {
          console.error('Error occurred while liking/disliking the post:', err);
        }
      };
    
      const postComment = async (postId: string) => {
        if (!commentText.trim()) return;
    
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/posts/comment/${postId}`,
            { content: commentText },
            { withCredentials: true }
          );
    
        //   setActivePostId(null);
          setCommentText('');
          console.log(response.data.message);
          const updatedPost = response.data.post;
          setPost(() =>
            updatedPost
          );
          setReloadTrigger(!reloadTrigger);
        } catch (err) {
          console.error('Error adding comment:', err);
        }
      };
    
    //   const handleCommentClick = (postId: string): void => {
    //     setActivePostId((prev: string | null) => (prev === postId ? null : postId));
    //   };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-orange-100 font-sans relative overflow-hidden flex justify-center items-center gap-3">
            {/* Emoji Background */}
            <div className="absolute inset-0 opacity-10 flex flex-wrap justify-center items-center pointer-events-none">
                {backgroundEmojis.map((emoji, index) => (
                    <span key={index} className="text-2xl p-2">{emoji}</span>
                ))}
            </div>

            <div className="container mx-auto p-6 flex flex-col justify-center items-center gap-3 relative z-10">
                {/* Fixed Navbar */}
                <div className={`fixed left-0 right-0 z-50 flex justify-center items-center transition-all duration-300 ${isScrolled ? 'top-0' : 'top-6'}`}>
                    <Navbar />
                </div>

                {/* Main feed */}
                <div className="mt-24 w-full flex flex-col items-center">
                    {post ? (
                        <div key={post._id} className="bg-white rounded-lg shadow-lg p-6 border-2 border-orange-300 cursor-pointer w-full lg:w-1/2">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={generateAvatarUrl(post._id)} // Add the appropriate avatar URL
                                        alt="User Avatar"
                                        className="w-12 h-12 rounded-full bg-slate-200"
                                    />
                                    <div>
                                        <h3 className="font-bold text-xl">Sara Andersen</h3>
                                        {/* Uncomment if you want to display the date */}
                                        <p className="text-gray-500">{new Date(post.createdAt).toLocaleDateString('en-GB')}, {new Date(post.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })}</p>
                                    </div>
                                </div>
                                <button className="text-orange-500 text-2xl hover:text-orange-600 transition-colors">•••</button>
                            </div>
                            <p className="text-xl mb-4">{post.content}🐶✨</p>

                            <div className="mt-4 flex justify-between items-center">
                                <button
                                    className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors"
                                    onClick={() => handleLike(post._id)}
                                >
                                    <span className="text-2xl">❤️</span>
                                    <span className="font-bold">{post.likes.length} Likes</span>
                                </button>
                                <button
                                    className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors"
                                    
                                >
                                    <span className="text-2xl">💬</span>
                                    <span className="font-bold">{post.comments.length} Comments</span>
                                </button>
                            </div>


                            <div className="mt-6 bg-orange-50 rounded-lg p-4">
                                <textarea
                                    className="w-full p-3 border-2 border-orange-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition duration-200"
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    placeholder="Write a comment..."
                                    rows={3}
                                />
                                <button
                                    className="mt-2 bg-orange-500 text-white px-6 py-2 rounded-full font-bold hover:bg-orange-600 transition-colors duration-200 shadow-md hover:shadow-lg"
                                    onClick={() => postComment(post._id)}
                                >
                                    Post Comment
                                </button>

                                <div className="mt-6 space-y-4">
                                    {post.comments.map((comment: Comment) => (
                                        <div key={comment._id} className="bg-white rounded-lg p-4 shadow-sm">
                                            <div className="flex items-start space-x-3">
                                                <img
                                                    src={generateAvatarUrl(comment._id)}// Assuming you have a function to generate the avatar URL
                                                    alt="Commenter Avatar"
                                                    className="w-8 h-8 rounded-full bg-orange-200"
                                                />
                                                <div className="flex-1">
                                                    <p>User</p>
                                                    <div className="flex w-full justify-between ">
                                                        <p className="text-gray-600 mt-1 font-semibold">{comment.content}</p>
                                                        <p className="text-xs text-gray-400 mt-2">
                                                            {new Date(comment.createdAt).toLocaleDateString('en-GB')} at{' '}
                                                            {new Date(comment.createdAt).toLocaleTimeString('en-GB', {
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                                hour12: false,
                                                            })}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    ) : (
                        <h1>No post</h1>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetailPost;



