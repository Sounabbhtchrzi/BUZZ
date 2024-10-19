import Navbar from "../component/Navbar"
import Feed from "../component/Feed"
import { useState, useEffect } from "react"

export default function Component() {

  const [backgroundEmojis, setBackgroundEmojis] = useState<string[]>([])
  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  useEffect(() => {
    const emojis = ['😀', '😎', '🤪', '🥳', '🚀', '🌈', '🍕', '🎉', '🦄', '🐶', '🌟', '🎸']
    const newBackgroundEmojis = []
    for (let i = 0; i < 5000; i++) {
      newBackgroundEmojis.push(emojis[Math.floor(Math.random() * emojis.length)])
    }
    setBackgroundEmojis(newBackgroundEmojis)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
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
        <div
          className={`fixed left-0 right-0 z-50 flex justify-center items-center transition-all duration-300 ${isScrolled ? 'top-0' : 'top-6'
            }`}
        >
          <Navbar />
        </div>

        {/* Main feed with added top margin to account for fixed navbar */}
        <div className="mt-24 w-full flex flex-col items-center">
          <Feed />
          {/* <Tabs /> */}
        </div>
      </div>
    </div>
  )
}