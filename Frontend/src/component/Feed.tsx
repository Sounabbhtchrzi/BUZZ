import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { Link } from "react-router-dom"
import { Sparkles, Send } from "lucide-react"
import Tabs from "./Tab"
import ShareButton from "./Sharebutton"
import ScrollToTopButton from "./ScrollTotop";
import Feedbackbutton from "./Feedbackbutton";

interface FeedProps {
  searchQuery: string
}

export default function Feed({ searchQuery }: FeedProps) {
  const [postText, setPostText] = useState("")
  const navigate = useNavigate();
  const [posts, setPosts] = useState([])
  const [commentText, setCommentText] = useState("")
  const [filteredPosts, setFilteredPosts] = useState([])
  const [activePostId, setActivePostId] = useState<string | null>(null)
  const [reloadTrigger, setReloadTrigger] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [newPosts, setNewPosts] = useState([]);
  const [hotPosts, setHotPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  const generateAvatarUrl = (seed: string) => {
    return `https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}`
  }

  useEffect(() => {
        const fetchPosts = async () => {
          try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/posts`);
            let sortedPosts = response.data;
            setAllPosts(sortedPosts);
            const currentTime = new Date().getTime();
            const oneDayAgo = currentTime - 24 * 60 * 60 * 1000;
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
            console.error('Error fetching posts:', err);
          }
        };
    
        fetchPosts();
      }, [reloadTrigger, activeTab]);

  useEffect(() => {
    const filtered = posts.filter((post: any) =>
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredPosts(filtered)
  }, [searchQuery, posts])

  const createPost = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!postText.trim()) return
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/posts/create`, { content: postText }, { withCredentials: true })
      if (response.status === 201) {
        console.log(response.data)
        setPostText('')
        setReloadTrigger(!reloadTrigger)
      } else {
        console.log('Failed to create post.')
      }
    } catch (err) {
      console.log('Error occurred while creating post.')
    }
  }

  const handleLike = async (id: string) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/posts/like/${id}`, {}, { withCredentials: true })
      if (response.status === 200) {
        const updatedPost = response.data.post
        setPosts((prevPosts: any) =>
          prevPosts.map((post: any) => (post._id === updatedPost._id ? updatedPost : post))
        )
        setReloadTrigger(!reloadTrigger)
      }
    } catch (err) {
      console.error('Error occurred while liking/disliking the post:', err)
    }
  }

  const postComment = async (postId: string) => {
    if (!commentText.trim()) return

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/posts/comment/${postId}`,
        { content: commentText },
        { withCredentials: true }
      )

      setActivePostId(null)
      setCommentText('')
      console.log(response.data.message)
      setReloadTrigger(!reloadTrigger)
    } catch (err) {
      console.error('Error adding comment:', err)
    }
  }

  const handleCommentClick = (postId: string): void => {
    setActivePostId((prev: string | null) => (prev === postId ? null : postId))
  }

  return (
    <>
    <main className="lg:w-1/2 w-11/12 space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-orange-300 transition-all duration-300 hover:shadow-xl">
        <form onSubmit={createPost} className="space-y-4">
          <div className="relative">
            <textarea
              placeholder="What's on your funky mind? 🤪"
              className="w-full p-4 pr-16 h-24 rounded-xl bg-gray-100 border-2 border-orange-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none text-lg transition-all duration-300"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-3 bottom-3 p-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg hover:from-orange-500 hover:to-pink-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transform hover:scale-105"
              disabled={!postText.trim()}
            >
              <Send size={24} className="animate-pulse" />
            </button>
          </div>
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => {
                navigate('/theme')
              }}
              className="px-4 py-2 bg-gradient-to-r from-purple-400 to-indigo-500 text-white rounded-full font-semibold text-sm hover:from-purple-500 hover:to-indigo-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 flex items-center space-x-2 transform hover:scale-105 hover:rotate-3"
            >
              <Sparkles size={16} className="animate-spin-slow" />
              <span>Explore Themes</span>
            </button>
            <p className="text-sm text-gray-500 italic animate-bounce">Share your thoughts with the world!</p>
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
        filteredPosts.map((post: any) => (
          <div key={post._id} className="bg-white rounded-xl shadow-lg p-6 border-2 border-orange-300 transition-all duration-300 hover:shadow-xl transform hover:scale-102">
            <Link to={`/post/${post._id}`}>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={generateAvatarUrl(post._id)}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full bg-orange-200 border-2 border-orange-300 transition-transform duration-300 hover:rotate-12"
                  />
                  <div>
                    <h3 className="font-bold text-xl text-gray-800">Sara Andersen</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString('en-GB')}, {new Date(post.createdAt).toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      })}
                    </p>
                  </div>
                </div>
                <button
                  className="text-orange-500 hover:text-orange-600 transition-colors transform hover:scale-110"
                  onClick={(e) => {
                    e.preventDefault();
                    (document.getElementById(`share_modal_${post._id}`) as HTMLDialogElement)?.showModal();
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>
              <p className="text-xl mb-4 text-gray-700">{post.content}🐶✨</p>
            </Link>
  
            <dialog id={`share_modal_${post._id}`} className="modal rounded-xl border-4 border-orange-400">
              <div className="modal-box rounded-xl bg-white p-6">
                <form method="dialog" className="absolute right-2 top-2">
                  <button className="btn btn-sm btn-circle btn-ghost text-gray-500 hover:text-gray-700">✕</button>
                </form>
                <ShareButton postId={post._id} />
              </div>
            </dialog>
  
            <div className="mt-4 flex justify-between items-center">
              <button
                className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors transform hover:scale-105"
                onClick={() => handleLike(post._id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="font-bold">{post.likes.length} Likes</span>
              </button>
              <button
                className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors transform hover:scale-105"
                onClick={() => handleCommentClick(post._id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="font-bold">{post.comments.length} Comments</span>
              </button>
            </div>
  
            {activePostId === post._id && (
              <div className="mt-6 bg-orange-50 rounded-xl p-4">
                <textarea
                  className="w-full p-3 border-2 border-orange-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition duration-200 resize-none"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  rows={3}
                />
                <button
                  className="mt-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white px-6 py-2 rounded-full font-bold hover:from-orange-500 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                  onClick={() => postComment(post._id)}
                >
                  Post Comment
                </button>
  
                <div className="mt-6 space-y-4">
                  {post.comments.map((comment: any) => (
                    <div key={comment._id} className="bg-white rounded-xl p-4 shadow-sm transition-all duration-300 hover:shadow-md">
                      <div className="flex items-start space-x-3">
                        <img
                          src={generateAvatarUrl(comment._id)}
                          alt="Commenter Avatar"
                          className="w-10 h-10 rounded-full bg-orange-100 border-2 border-orange-300"
                        />
                        <div>
                          <h4 className="font-bold text-gray-800">Kneega</h4>
                          <p className="text-sm text-gray-600">{comment.content}</p>
                          
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
        <p className="text-center text-lg text-gray-500 mt-10 animate-pulse">No posts available... Be the first to share!</p>
      )}
    </main>
    <ScrollToTopButton />
     <Feedbackbutton/>
     </>
  );
}
  