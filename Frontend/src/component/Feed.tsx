// import React from 'react';
import { useState, useEffect } from "react";
import Tabs from "./Tab";
import axios from "axios";
// import { AvatarGenerator } from 'random-avatar-generator';



const Feed = () => {
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);

  const generateAvatarUrl = (seed: string) => {
    return `https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}`;
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts'); // Adjust the endpoint as necessary
        console.log(response.data);
        setPosts(response.data);
      } catch (err) {
        console.error('Error fetching posts:', err);
        console.log('Failed to fetch posts');
      }
    };

    fetchPosts();
  }, []);

  const createPost = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/posts/create', { content: postText }, { withCredentials: true });
      if (response.status === 201) {
        console.log(response.data);
        setPostText('');
      } else {
        console.log('Failed to create post.');
      }
    } catch (err) {
      console.log('Error occurred while creating post.');
    }
  };

  const handleLike = async (id: string) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/posts/like/${id}`, {}, { withCredentials: true });
      if (response.status === 200) {
        // Update the local state with the updated post data
        const updatedPost = response.data.post;
        setPosts((prevPosts: any) =>
          prevPosts.map((post: any) => (post._id === updatedPost._id ? updatedPost : post))
        );
      }
    } catch (err) {
      console.error('Error occurred while liking/disliking the post:', err);
    }
  };



  return (
    <main className="lg:w-1/2 w-11/12 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-orange-300">
        <form onSubmit={createPost}>
          <textarea
            placeholder="What's on your funky mind? 🤪"
            className="w-full p-3 h-20 rounded bg-gray-100 border border-orange-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none text-lg"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
          <div className="flex justify-center lg:justify-end mt-4 ">
            {/* <button className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors">
              <span className="text-2xl">📸</span>
              <span>Photo/Video</span>
            </button>
            <button className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors">
              <span className="text-2xl">🏷️</span>
              <span>Tag</span>
            </button>
            <button className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors">
              <span className="text-2xl">📍</span>
              <span>Location</span>
            </button>
            <button className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors">
              <span className="text-2xl">😊</span>
              <span>Feelings</span>
            </button> */}
            <button
              className="bg-orange-500 text-white px-6 py-2 rounded-full font-bold text-lg hover:bg-orange-600 transition-colors"

            >
              Post It! 🔥
            </button>
          </div>
        </form>
      </div>

      <Tabs />
      {posts.map((post: any) => {
        // const avatarUrl = generator.generateRandomAvatar(); // Generate a new random avatar for each post

        return (
          <div key={post._id} className="bg-white rounded-lg shadow-lg p-6 border-2 border-orange-300">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={generateAvatarUrl(post._id)} // Use post._id as the seed to generate a unique avatar
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full bg-slate-200"
                />
                <div>
                  <h3 className="font-bold text-xl">Sara Andersen</h3>
                  <p className="text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString('en-GB')}, {new Date(post.createdAt).toLocaleTimeString('en-GB', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    })}
                  </p>
                </div>
              </div>
              <button className="text-orange-500 text-2xl hover:text-orange-600 transition-colors">•••</button>
            </div>
            <p className="text-xl mb-4">{post.content}🐶✨</p>

            <div className="mt-4 flex justify-between items-center">
              <button className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors" onClick={() => handleLike(post._id)} >
                <span className="text-2xl">❤️</span>
                <span className="font-bold">{post.likes.length} Likes</span>
              </button>
              <button className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors">
                <span className="text-2xl">💬</span>
                <span className="font-bold">7 Comments</span>
              </button>
            </div>
          </div>
        );
      })}




    </main>
  );
}

export default Feed;

