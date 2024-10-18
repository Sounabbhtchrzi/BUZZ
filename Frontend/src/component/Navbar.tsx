import { Search } from "lucide-react"
import { Link } from "react-router-dom";


const Navbar = () => (
  <header className="bg-white shadow-md p-4 w-1/2 rounded-md flex items-center justify-between relative z-10">
<Link to='/' className="group">
      <h1 className="text-4xl font-extrabold relative">
        <span className="inline-block transform hover:scale-150 transition-transform duration-300 text-orange-500 ">B</span>
        <span className="inline-block transform hover:rotate-180 transition-transform duration-300 text-orange-600 ">U</span>
        <span className="inline-block transform hover:skew-y-12 transition-transform duration-300 text-orange-700 ">Z</span>
        <span className="inline-block transform hover:-skew-y-12 transition-transform duration-300 text-orange-800">Z</span>
        {/* <span className="absolute -top-1 left-0 w-full h-full bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300"></span> */}
      </h1>
    </Link>

    <div className="flex-grow mx-4 flex justify-center items-center">
      <div className="relative flex justify-center items-center w-full max-w-md">
        <input
          type="text"
          placeholder="Search for a friend"
          className="w-full p-2 px-4 rounded-full text-black bg-gray-100 border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <Search className="absolute right-3 cursor-pointer text-orange-500" size={20} />
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <Link to={'/about'} className="relative text-orange-500 hover:text-orange-600 transition-colors flex justify-center items-center gap-1">

        About Us
        {/* <MessageSquare size={24} /> */}
      </Link>
      <button className="relative text-orange-500 hover:text-orange-600 transition-colors flex justify-center items-center gap-1">

        Theme
        {/* <MessageSquare size={24} /> */}
      </button>


    </div>
  </header>
)

export default Navbar;
