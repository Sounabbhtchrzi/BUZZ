// import React from 'react';
import { useState,useEffect } from "react";
import Tabs from "./Tab";
import axios from "axios";

const Feed = () => {
  const [postText, setPostText] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/posts'); // Adjust the endpoint as necessary
            console.log(response.data);
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
      const response = await axios.post('http://localhost:5000/api/posts/create',  {content: postText }, { withCredentials: true });
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


  return (
    <main className="w-1/2 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-orange-300">
        <form onSubmit={createPost}>
        <textarea
          placeholder="What's on your funky mind? 🤪"
          className="w-full p-3 h-20 rounded bg-gray-100 border border-orange-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none text-lg"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />
        <div className="flex justify-between mt-4">
          <button className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors">
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
          </button>
          <button
            className="bg-orange-500 text-white px-6 py-2 rounded-full font-bold text-lg hover:bg-orange-600 transition-colors"
           
          >
            Post It! 🔥
          </button>
        </div>
        </form>
      </div>

      <Tabs/>

      <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-orange-300">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              SA
            </div>
            <div>
              <h3 className="font-bold text-xl">Sara Andersen</h3>
              <p className="text-gray-500">5/24/2020, 2:53:17 PM</p>
            </div>
          </div>
          <button className="text-orange-500 text-2xl hover:text-orange-600 transition-colors">•••</button>
        </div>
        <p className="text-xl mb-4">Just chillin' with my funky Labrador retriever! 🐶✨</p>
        <div className="w-full h-64 bg-orange-100 rounded-lg flex items-center justify-center overflow-hidden relative">
          <img
            src="/placeholder.svg?height=256&width=512&text=Funky+Labrador"
            alt="Funky Labrador"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-9xl">🐕</span>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors">
            <span className="text-2xl">❤️</span>
            <span className="font-bold">42 Likes</span>
          </button>
          <button className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors">
            <span className="text-2xl">💬</span>
            <span className="font-bold">7 Comments</span>
          </button>
          {/* <button className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors">
            <span className="text-2xl">🔥</span>
            <span className="font-bold">Roast</span>
          </button> */}
        </div>


        
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-orange-300">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              SA
            </div>
            <div>
              <h3 className="font-bold text-xl">Sara Andersen</h3>
              <p className="text-gray-500">5/24/2020, 2:53:17 PM</p>
            </div>
          </div>
          <button className="text-orange-500 text-2xl hover:text-orange-600 transition-colors">•••</button>
        </div>
        <p className="text-xl mb-4">Just chillin' with my funky Labrador retriever! 🐶✨</p>
        <div className="w-full h-64 bg-orange-100 rounded-lg flex items-center justify-center overflow-hidden relative">
          <img
            src="/placeholder.svg?height=256&width=512&text=Funky+Labrador"
            alt="Funky Labrador"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-9xl">🐕</span>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors">
            <span className="text-2xl">❤️</span>
            <span className="font-bold">42 Likes</span>
          </button>
          <button className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors">
            <span className="text-2xl">💬</span>
            <span className="font-bold">7 Comments</span>
          </button>
          {/* <button className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors">
            <span className="text-2xl">🔥</span>
            <span className="font-bold">Roast</span>
          </button> */}
        </div>


        
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-orange-300">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              SA
            </div>
            <div>
              <h3 className="font-bold text-xl">Sara Andersen</h3>
              <p className="text-gray-500">5/24/2020, 2:53:17 PM</p>
            </div>
          </div>
          <button className="text-orange-500 text-2xl hover:text-orange-600 transition-colors">•••</button>
        </div>
        <p className="text-xl mb-4">Just chillin' with my funky Labrador retriever! 🐶✨</p>
        <div className="w-full h-64 bg-orange-100 rounded-lg flex items-center justify-center overflow-hidden relative">
          <img
            src="/placeholder.svg?height=256&width=512&text=Funky+Labrador"
            alt="Funky Labrador"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-9xl">🐕</span>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors">
            <span className="text-2xl">❤️</span>
            <span className="font-bold">42 Likes</span>
          </button>
          <button className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors">
            <span className="text-2xl">💬</span>
            <span className="font-bold">7 Comments</span>
          </button>
          {/* <button className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors">
            <span className="text-2xl">🔥</span>
            <span className="font-bold">Roast</span>
          </button> */}
        </div>


        
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-orange-300">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              SA
            </div>
            <div>
              <h3 className="font-bold text-xl">Sara Andersen</h3>
              <p className="text-gray-500">5/24/2020, 2:53:17 PM</p>
            </div>
          </div>
          <button className="text-orange-500 text-2xl hover:text-orange-600 transition-colors">•••</button>
        </div>
        <p className="text-xl mb-4">Just chillin' with my funky Labrador retriever! 🐶✨</p>
        <div className="w-full h-64 bg-orange-100 rounded-lg flex items-center justify-center overflow-hidden relative">
          <img
            src="/placeholder.svg?height=256&width=512&text=Funky+Labrador"
            alt="Funky Labrador"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-9xl">🐕</span>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors">
            <span className="text-2xl">❤️</span>
            <span className="font-bold">42 Likes</span>
          </button>
          <button className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors">
            <span className="text-2xl">💬</span>
            <span className="font-bold">7 Comments</span>
          </button>
          {/* <button className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors">
            <span className="text-2xl">🔥</span>
            <span className="font-bold">Roast</span>
          </button> */}
        </div>


        
      </div>
    </main>
  );
}

export default Feed;

