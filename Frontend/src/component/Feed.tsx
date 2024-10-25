import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { Link } from "react-router-dom"
import { Sparkles, Send, Smile,Loader } from "lucide-react"
import Tabs from "./Tab"
import ShareButton from "./Sharebutton"
import ScrollToTopButton from "./ScrollTotop";
import Feedbackbutton from "./Feedbackbutton";
import { toast } from "react-toastify";
import { uniqueNamesGenerator, Config, adjectives, animals } from 'unique-names-generator';
import EmojiPicker from 'emoji-picker-react';



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


interface FeedProps {
  searchQuery: string
}

export default function Feed({ searchQuery }: FeedProps) {
  const [postText, setPostText] = useState("")
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [commentText, setCommentText] = useState("")
  const [activePostId, setActivePostId] = useState<string | null>(null)
  const [reloadTrigger, setReloadTrigger] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [hotPosts, setHotPosts] = useState<Post[]>([]);
  const [newPosts, setNewPosts] = useState<Post[]>([]);
  const [shortNames, setShortNames] = useState<{ [key: string]: string }>({});
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showCommentEmojiPicker, setShowCommentEmojiPicker] = useState(false);
  const [isLoading,setIsLoading] = useState(false);

  const generateAvatarUrl = (seed: string) => {
    return `https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}`
  }

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/posts`);
  //       let sortedPosts = response.data;
  //       setAllPosts(sortedPosts);
  //       const currentTime = new Date().getTime();
  //       const oneDayAgo = currentTime - 24 * 60 * 60 * 1000;
  //       setHotPosts(sortedPosts.filter((post: any) => post.likes.length >= 3));
  //       //sortedPosts.sort((a: any, b: any) => b.likes.length - a.likes.length);
  //       setNewPosts(sortedPosts.filter((post: any) => new Date(post.createdAt).getTime() >= oneDayAgo));

  //       if (activeTab === 'hot') {
  //         sortedPosts = sortedPosts.filter((post: any) => post.likes.length >= 3);
  //         sortedPosts.sort((a: any, b: any) => b.likes.length - a.likes.length);
  //       } else if (activeTab === 'new') {
  //         sortedPosts = sortedPosts.filter((post: any) => new Date(post.createdAt).getTime() >= oneDayAgo);
  //         sortedPosts.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  //       }


  //       setPosts(sortedPosts);
  //     } catch (err) {
  //       console.error('Error fetching posts:', err);
  //     }
  //   };

  //   fetchPosts();
  // }, [reloadTrigger, activeTab]);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/posts`);
        const sortedPosts = response.data;

        setAllPosts(sortedPosts);
        setHotPosts(sortedPosts.filter((post: any) => post.likes.length >= 3));

        const currentTime = new Date().getTime();
        const oneDayAgo = currentTime - 24 * 60 * 60 * 1000;
        setNewPosts(sortedPosts.filter((post: any) => new Date(post.createdAt).getTime() >= oneDayAgo));
        filterPosts(sortedPosts);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }finally{
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [reloadTrigger]);


  const filterPosts = (posts: any) => {
    let sortedPosts = [...posts];

    if (activeTab === 'hot') {
      sortedPosts = sortedPosts.filter((post) => post.likes.length >= 3);
      sortedPosts.sort((a, b) => b.likes.length - a.likes.length);
    } else if (activeTab === 'new') {
      const currentTime = new Date().getTime();
      const oneDayAgo = currentTime - 24 * 60 * 60 * 1000;
      sortedPosts = sortedPosts.filter((post) => new Date(post.createdAt).getTime() >= oneDayAgo);
      sortedPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    setPosts(sortedPosts);
  };

  useEffect(() => {
    filterPosts(allPosts);
  }, [activeTab, allPosts]);

  useEffect(() => {
    const filtered = posts.filter((post: any) =>
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredPosts(filtered)
  }, [searchQuery, posts])

  const createPost = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!postText.trim()) return
    let response;
    try {
      response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/posts/create`, { content: postText }, { withCredentials: true })
      console.log(response.data);
      if (response.status === 201) {
        console.log(response.data)
        setPostText('')
        setReloadTrigger(!reloadTrigger)
        toast.success("Post done Sucessfully", {
          style: { backgroundColor: 'green', color: 'white' }, // Custom inline styles
        });
      }
    } catch (err) {
      const errorMessage = axios.isAxiosError(err) && err.response?.data?.message ? err.response.data.message : "An error occurred";
      toast.error(errorMessage, {
        style: { backgroundColor: '#FF6B6B', color: 'white' },
      });
      setPostText('');
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

  const handleGenerate = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/posts/aimessage`);
      setPostText(response.data.result);
      //console.log(response.data.result);
    } catch (error) {
      console.error("Error generating text:", error);
    }
  };

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
      // console.log(response.data.message)
      toast.info(response.data.message);
      setReloadTrigger(!reloadTrigger)
    } catch (err) {
      console.error('Error adding comment:', err)
    }
  }

  const handleCommentClick = (postId: string): void => {
    setActivePostId((prev: string | null) => (prev === postId ? null : postId))
  }
  const customConfig: Config = {
    dictionaries: [adjectives, animals],
    separator: '-',
    length: 2,
  };


  useEffect(() => {

    if (filteredPosts.length > 0) {
      const newNames: { [key: string]: string } = { ...shortNames };

      filteredPosts.forEach((post: any) => {

        if (!newNames[post._id]) {
          newNames[post._id] = uniqueNamesGenerator(customConfig);
        }

        post.comments.forEach((comment: any) => {

          if (!newNames[comment._id]) {
            newNames[comment._id] = uniqueNamesGenerator(customConfig);
          }
        });
      });
      setShortNames(newNames);
    }
  }, [filteredPosts]);

  const onEmojiClick = (emojiObject: any) => {
    setPostText((prevText) => prevText + emojiObject.emoji);
  };

  const onCommentEmojiClick = (emojiObject: any) => {
    setCommentText((prevText) => prevText + emojiObject.emoji);
  };

  return (
    <>
      <main className="lg:w-1/2 w-11/12 space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-orange-300 transition-all duration-300 hover:shadow-xl">
          <form
            onSubmit={createPost}
            className="space-y-4"
          >
            <div className="relative">
              <textarea
                placeholder="What's on your funky mind? 🤪"
                className="w-full p-4 lg:pr-36 pr-5  h-24 rounded-xl bg-gray-100 border-2 border-orange-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none text-lg transition-all duration-300"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
              />

              {/* Generate with AI button */}


              {/* Send button */}
              <button
                type="submit"
                className="absolute right-3 bottom-3 p-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg hover:from-orange-500 hover:to-pink-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transform hover:scale-105"
                disabled={!postText.trim()}
              >
                <Send size={24} className="animate-pulse" />
              </button>

              {/* Emoji picker toggle button */}
              <button
                type="button"
                onClick={() => setShowEmojiPicker((prev) => !prev)}
                className="absolute right-16 bottom-3 p-2 bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-lg hover:bg-gray-200 transition-all duration-300 md:block hidden focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <Smile size={24} />
              </button>

              {/* Show emoji picker below textarea */}
              {showEmojiPicker && (
                <div className="absolute right-20 mt-2 z-50 w-64 md:block hidden">
                  <EmojiPicker onEmojiClick={onEmojiClick} />
                </div>
              )}
            </div>



            <div className="flex lg:justify-between justify-center items-center">
              <div className=" flex gap-3">
              <button
                type="button"
                onClick={() => {
                  navigate('/theme');
                }}
                className="px-4 py-2 bg-gradient-to-r from-purple-400 to-indigo-500 text-white rounded-lg font-semibold text-sm hover:from-purple-500 hover:to-indigo-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 flex items-center space-x-2 transform hover:scale-105 hover:rotate-3"
              >
                <Sparkles size={16} className="animate-spin-slow" />
                <span className=" text-xs lg:text-base">Explore Themes</span>
              </button>
              <button
                onClick={handleGenerate}
                type="button"
                className="flex items-center lg:gap-1 gap-1 p-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                 <Sparkles size={16} className="animate-spin-slow" />
                 <span className=" text-xs lg:text-lg"> Generate with AI</span>
               
              </button>
              </div>
              <p className="text-sm text-gray-500 italic animate-bounce hidden lg:block">
                Share your thoughts with the world!
              </p>
            </div>
          </form>

        </div>
        

        <Tabs activeTab={activeTab}
          setActiveTab={setActiveTab}
          posts={filteredPosts}
          newPostsCount={newPosts.length}
          hotPostsCount={hotPosts.length}
          allPostsCount={allPosts.length} />

        {isLoading?(
          <div className="flex flex-col items-center mt-10">
          <Loader className="text-orange-500 animate-spin" size={48} />
          <p className="text-center text-lg text-gray-500 mt-4 animate-pulse">Loading posts...</p>
        </div>
        ):(

        filteredPosts.length > 0 ? (

          filteredPosts.map((post: any) => {

            return (<div key={post._id} className="bg-white rounded-xl shadow-lg lg:p-6 p-3 border-2 border-orange-300 transition-all duration-300 hover:shadow-xl transform hover:scale-102">
              <Link to={`/post/${post._id}`}>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={generateAvatarUrl(post._id)}
                      alt="User Avatar"
                      className="w-12 h-12 rounded-full bg-orange-200 border-2 border-orange-300 transition-transform duration-300 hover:rotate-12"
                    />
                    <div>
                      <h3 className="font-bold text-xl text-gray-800"> {shortNames[post._id]}</h3>
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
                <p className="text-xl mb-4 text-gray-700">{post.content}</p>
              </Link>

              <dialog id={`share_modal_${post._id}`} className="modal rounded-xl border-4 border-orange-400">

                <div className="modal-box rounded-lg">
                  <form method="dialog" className="">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-orange-400 text-white flex justify-center items-center font-bold w-6 h-6 rounded-full">✕</button>
                  </form>
                  {/* <h3 className="font-bold text-lg">➦</h3> */}
                  {/* Use the ShareButton component and pass the post ID */}
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
                <div className="mt-6 bg-orange-50 rounded-xl lg:p-4 p-2">
                  
                    <div className="relative">
                      <textarea
                        className="w-full p-3 border-2 border-orange-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition duration-200 resize-none"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Write a comment..."
                        rows={3}
                      />

                      {/* Emoji picker toggle button */}
                      <button
                        type="button"
                        onClick={() => setShowCommentEmojiPicker((prev) => !prev)}
                        className="absolute left-3 bottom-3 p-2 text-orange-500 rounded-lg hover:bg-gray-200 transition-all duration-300 md:block hidden focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <Smile size={24} />
                      </button>

                      {/* Show emoji picker */}
                      {showCommentEmojiPicker && (
                        <div className="absolute left-0 bottom-12 mt-2 z-100 w-22 md:block hidden">
                          <EmojiPicker
                            onEmojiClick={onCommentEmojiClick}
                            className="w-14"
                          />
                        </div>
                      )}
                    </div>

                    <button
                      className="mt-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white px-6 py-2 rounded-full font-bold hover:from-orange-500 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                      onClick={() => postComment(post._id)}
                    >
                      Post Comment
                    </button>
                  



                  <div className="mt-6 space-y-4">
                    {post.comments.map((comment: any) => (
                      <div key={comment._id} className="bg-white flex flex-col  rounded-xl lg:p-4 p-2 shadow-sm transition-all duration-300 hover:shadow-md">
                        <div className="flex gap-3 items-center justify-start">
                          <img
                            src={generateAvatarUrl(comment._id)}
                            alt="Commenter Avatar"
                            className="w-10 h-10 rounded-full bg-orange-100 border-2 border-orange-300"
                          />
                          <h4 className="font-bold text-gray-500">{shortNames[comment._id]}</h4>
                        </div>
                        <div className=" w-full lg:pl-12 p-2 flex flex-col justify-between">
                          <p className="text-black font-semibold text-xl">{comment.content}</p>
                          <p className="text-xs text-gray-400 mt-2 flex justify-end  w-full ">
                            {new Date(comment.createdAt).toLocaleDateString('en-GB')} at{' '}
                            {new Date(comment.createdAt).toLocaleTimeString('en-GB', {
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: false,
                            })}
                          </p>
                        </div>


                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>)

          })
        ) : (
          <p className="text-center text-lg text-gray-500 mt-10 animate-pulse">No posts available... Be the first to share!</p>
        )
        )}
      </main>
      <ScrollToTopButton />
      <Feedbackbutton />
    </>
  );
}
