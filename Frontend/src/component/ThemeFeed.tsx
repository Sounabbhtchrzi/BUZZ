import { useState, useEffect } from "react";
import axios from "axios";
import Tabs from "./Tab";

// Define the Post interface
interface Post {
  _id: string;
  content: string;
  createdAt: string;
  likes: string[]; // or you can define a more specific type
  comments: Comment[]; // Define Comment if necessary
}

// Define the Comment interface (if needed)
interface Comment {
  _id: string;
  content: string;
  createdAt: string;
}

interface ThemeFeedProps {
  searchQuery: string;
}


const ThemeFeed = ({searchQuery}:ThemeFeedProps) => {
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState<Post[]>([]); // Use the Post type here
  const [commentText, setCommentText] = useState("");
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [reloadTrigger, setReloadTrigger] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date().toDateString());
  const [currentTheme, setCurrentTheme] = useState("Dream");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]); 
  const [activeTab, setActiveTab] = useState('hot');
  const [newPosts, setNewPosts] = useState([]);
  const [hotPosts, setHotPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  const generateAvatarUrl = (seed: string) => {
    return `https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}`;
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/posts/theme`);
        let sortedPosts = response.data;
        setAllPosts(sortedPosts);
        const currentTime = new Date().getTime();
        const oneDayAgo = currentTime - 12 * 60 * 60 * 1000;
        setHotPosts(sortedPosts.filter((post: any) => post.likes.length >= 3));
        sortedPosts.sort((a: any, b: any) => b.likes.length - a.likes.length);
        setNewPosts(sortedPosts.filter((post: any) => new Date(post.createdAt).getTime() >= oneDayAgo));
        
        if (activeTab === 'hot') {
          sortedPosts = sortedPosts.filter((post: any) => post.likes.length >= 3);
          sortedPosts.sort((a: any, b: any) => b.likes.length - a.likes.length);
        } else if (activeTab === 'new') {
          sortedPosts = sortedPosts.filter((post: any) => new Date(post.createdAt).getTime() >= oneDayAgo);
          sortedPosts.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }


        setPosts(sortedPosts);
      } catch (err) {
        console.error("Error fetching theme posts:", err);
      }
     
    };

    const checkAndUpdateTheme = async () => {
      const today = new Date().toDateString();
      
      if (currentDate !== today) {
        await clearPreviousPosts();
        setCurrentDate(today);
        const newTheme = fetchNewTheme();
        setCurrentTheme(newTheme);
      }
    };
    fetchPosts();
    checkAndUpdateTheme();
  }, [reloadTrigger, currentDate,activeTab]);



  useEffect(() => {
    const filtered = posts.filter((post: any) =>
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);



  const fetchNewTheme = () => {
    const themes = ["Adventure", "Space Exploration", "Mystery", "Fantasy", "Technology"];
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    return randomTheme;
  };

  const clearPreviousPosts = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/posts/theme/clear`, { withCredentials: true });
      setReloadTrigger((prev) => !prev);
    } catch (err) {
      console.error("Error clearing previous posts:", err);
    }
  };

  const createPost = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/posts/theme/create`, { content: postText }, { withCredentials: true });
      if (response.status === 201) {
        setPostText("");
        setReloadTrigger((prev) => !prev);
      } else {
        console.log("Failed to create theme post.");
      }
    } catch (err) {
      console.log("Error occurred while creating theme post.");
    }
  };

  const handleLike = async (id: string) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/posts/theme/like/${id}`, {}, { withCredentials: true });
      if (response.status === 200) {
        const updatedPost = response.data.post;
        setPosts((prevPosts) =>
          prevPosts.map((post) => (post._id === updatedPost._id ? updatedPost : post))
        );
        setReloadTrigger((prev) => !prev);
      }
    } catch (err) {
      console.error("Error occurred while liking/disliking the theme post:", err);
    }
  };

  const postComment = async (postId: string) => {
    if (!commentText.trim()) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/posts/theme/comment/${postId}`,
        { content: commentText },
        { withCredentials: true }
      );
      console.log(response.data);
      setActivePostId(null);
      setCommentText("");
      setReloadTrigger((prev) => !prev);
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  const handleCommentClick = (postId: string): void => {
    setActivePostId((prev) => (prev === postId ? null : postId));
  };

  return (
    <main className="lg:w-1/2 w-11/12 space-y-6">
   
      <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-orange-300">
        <h2 className="text-xl font-bold">Today's theme is: {currentTheme || "Loading..."}</h2>
        <form onSubmit={createPost}>
          <textarea
            placeholder={`What do you think about ${currentTheme}? 🤪`}
            className="w-full p-3 h-20 rounded bg-gray-100 border border-orange-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none text-lg"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
          <div className="flex justify-center lg:justify-end mt-4 ">
            <button className="bg-orange-500 text-white px-6 py-2 rounded-full font-bold text-lg hover:bg-orange-600 transition-colors">
              Post It! 🔥
            </button>
          </div>
        </form>
      </div>

      <Tabs activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        posts={filteredPosts} 
        newPostsCount={newPosts.length}   
        hotPostsCount={hotPosts.length}
        allPostsCount={allPosts.length} />

      {filteredPosts.length > 0 ? (
        filteredPosts.map((post: Post) => (
          <div key={post._id} className="bg-white rounded-lg shadow-lg p-6 border-2 border-orange-300">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={generateAvatarUrl(post._id)}
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full bg-slate-200"
                />
                <div>
                  <h3 className="font-bold text-xl">User</h3>
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
                  {post.comments.map((comment: Comment) => (
                    <div key={comment._id} className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-start space-x-3">
                        <img
                          src={generateAvatarUrl(comment._id)}
                          alt="Comment Avatar"
                          className="w-8 h-8 rounded-full bg-slate-200"
                        />
                        <div>
                          <p className="font-bold">User</p>
                          <p>{comment.content}</p>
                        </div>
                      </div>
                      <p className="text-gray-500 mt-2 text-sm">
                        {new Date(comment.createdAt).toLocaleDateString('en-GB')}, {new Date(comment.createdAt).toLocaleTimeString('en-GB', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false,
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-orange-300 text-center">
          <h3 className="text-xl">No posts available for today. Be the first to share!</h3>
        </div>
      )}
    </main>
  );
};

export default ThemeFeed;