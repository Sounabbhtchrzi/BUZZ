'use client'

import { useState,ChangeEvent } from 'react'
import { Search, MoreVertical, X } from "lucide-react"
import { Link } from "react-router-dom"

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}
export default function Navbar({ searchQuery, setSearchQuery }:NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className="bg-white shadow-md p-4 lg:w-1/2 w-11/12 rounded-md flex items-center justify-between relative z-10">
      <Link to='/' className="group w-16 lg:w-32">
        <h1 className="text-2xl sm:text-2xl lg:text-4xl text-lg font-extrabold relative">
          <span className="inline-block transform hover:scale-150 transition-transform duration-300 text-orange-500">B</span>
          <span className="inline-block transform hover:rotate-180 transition-transform duration-300 text-orange-600">U</span>
          <span className="inline-block transform hover:skew-y-12 transition-transform duration-300 text-orange-700">Z</span>
          <span className="inline-block transform hover:-skew-y-12 transition-transform duration-300 text-orange-800">Z</span>
        </h1>
      </Link>

      <div className="flex-grow mx-2 flex justify-center items-center">
        <div className="relative flex justify-center items-center w-full max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search for posts.."
            className="w-full p-2 px-4 rounded-full text-black bg-gray-100 border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <Search className="absolute right-3 cursor-pointer text-orange-500" size={20} />
        </div>
      </div>

      {/* Desktop menu */}
      <div className="hidden lg:flex items-center space-x-4">
        <Link to={'/about'} className="text-orange-500 hover:text-orange-600 transition-colors">
          About Us
        </Link>
        <Link to={'/theme'} className="text-orange-500 hover:text-orange-600 transition-colors">
          Theme
        </Link>
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden">
        <button onClick={toggleMenu} className="text-orange-500 hover:text-orange-600 transition-colors">
          {isMenuOpen ? <X size={24} /> : <MoreVertical size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
          <Link 
            to={'/about'} 
            className="block px-4 py-2 text-orange-500 hover:bg-orange-100 transition-colors"
            onClick={toggleMenu}
          >
            About Us
          </Link>
          <button 
            className="block w-full text-left px-4 py-2 text-orange-500 hover:bg-orange-100 transition-colors"
            onClick={toggleMenu}
          >
            Theme
          </button>
        </div>
      )}
    </header>
  )
}