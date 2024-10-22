// import React from 'react';
import { useState, useEffect } from "react";
import Tabs from "./Tab";
import axios from "axios";
import { Link } from "react-router-dom";
// import { AvatarGenerator } from 'random-avatar-generator';
import ShareButton from "./Sharebutton";

interface FeedProps {
  searchQuery: string;
}

const Feed = ({searchQuery}:FeedProps) => {
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [reloadTrigger, setReloadTrigger] = useState(false);
  const [activeTab, setActiveTab] = useState('hot');


  const generateAvatarUrl = (seed: string) => {
    return `https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}`;
  };
  // console.log(import.meta.env.VITE_BACKEND_URL);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/posts`);
        let sortedPosts = response.data;

        if (activeTab === 'hot') {
          sortedPosts.sort((a: any, b: any) => b.likes.length - a.likes.length);
        } else if (activeTab === 'new') {
          sortedPosts.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }


        setPosts(sortedPosts);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };

    fetchPosts();
  }, [reloadTrigger, activeTab]);

  useEffect(() => {
    const filtered = posts.filter((post: any) =>
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);



  const createPost = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/posts/create`, { content: postText }, { withCredentials: true });
      if (response.status === 201) {
        console.log(response.data);
        setPostText('');
        setReloadTrigger(!reloadTrigger);
      } else {
        console.log('Failed to create post.');
      }
    } catch (err) {
      console.log('Error occurred while creating post.');
    }
  };

  const handleLike = async (id: string) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/posts/like/${id}`, {}, { withCredentials: true });
      if (response.status === 200) {
        // Update the local state with the updated post data
        const updatedPost = response.data.post;
        setPosts((prevPosts: any) =>
          prevPosts.map((post: any) => (post._id === updatedPost._id ? updatedPost : post))
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

      setActivePostId(null);
      setCommentText('');
      console.log(response.data.message);
      setReloadTrigger(!reloadTrigger);
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const handleCommentClick = (postId: string): void => {
    setActivePostId((prev: string | null) => (prev === postId ? null : postId));
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

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} posts={filteredPosts} />
    
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post: any) => (
          <div key={post._id} className="relative bg-white rounded-lg shadow-lg p-6 border-2 border-orange-300 cursor-pointer">
            <Link to={`/post/${post._id}`}>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={generateAvatarUrl(post._id)}
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


              </div>
              <p className="text-xl mb-4">{post.content}🐶✨</p>

            </Link>

            <button
              className="btn absolute top-4 right-5 text-orange-500 text-2xl hover:text-orange-600 transition-colors"
              onClick={() => (document.getElementById("my_modal_3") as HTMLDialogElement).showModal()}
            >
              ➦
            </button>
            <dialog id="my_modal_3" className="modal rounded-lg border-4 border-orange-400">
              <div className="modal-box rounded-lg">
                <form method="dialog" className="">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                {/* <h3 className="font-bold text-lg">➦</h3> */}
                {/* Use the ShareButton component and pass the post ID */}
                <ShareButton postId={post._id} />
              </div>
            </dialog>
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
                onClick={() => handleCommentClick(post._id)}
              >
                <span className="text-2xl">💬</span>
                <span className="font-bold">{post.comments.length} Comments</span>
              </button>
            </div>


            {activePostId === post._id && (
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
                  {post.comments.map((comment: any) => (
                    <div key={comment._id} className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-start space-x-3">
                        <img
                          src={generateAvatarUrl(comment._id)}
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
            )}
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 text-xl mt-4">No posts available</div>
      )}

    </main>
  );
}

export default Feed;
