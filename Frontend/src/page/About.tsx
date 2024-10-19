import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Component() {
  const [backgroundEmojis, setBackgroundEmojis] = useState<string[]>([])

  useEffect(() => {
    const emojis = ['😀', '😎', '🤪', '🥳', '🚀', '🌈', '🍕', '🎉', '🦄', '🐶', '🌟', '🎸']
    const newBackgroundEmojis = Array.from({ length: 500 }, () => emojis[Math.floor(Math.random() * emojis.length)])
    setBackgroundEmojis(newBackgroundEmojis)
  }, [])

  const creators = [
    {
      name: 'Shreyam Kundu',
      about: 'Code wizard by day, meme lord by night. Turns caffeine into code faster than you can say "bug"!',
      linkedin: 'https://www.linkedin.com/in/shreyam-kundu',
      github: 'https://github.com/shreyam-kundu'
    },
    {
      name: 'Snikdhendu Pramanik',
      about: 'Full-stack ninja with a black belt in debugging. Can build entire websites while standing on one foot!',
      linkedin: 'https://www.linkedin.com/in/snikdhendu-pramanik',
      github: 'https://github.com/snikdhendu-pramanik'
    },
    {
      name: 'Sounab Bhattacharjee',
      about: 'UI/UX maestro who makes interfaces so smooth, users forget they!',
      linkedin: 'https://www.linkedin.com/in/sounab-bhattacharjee',
      github: 'https://github.com/sounab-bhattacharjee'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-orange-100 font-sans relative overflow-hidden">
      {/* Emoji Background */}
      <div className="absolute inset-0 opacity-10 flex flex-wrap justify-center items-center pointer-events-none">
        {backgroundEmojis.map((emoji, index) => (
          <span key={index} className="text-2xl p-2">{emoji}</span>
        ))}
      </div>

      <div className="container mx-auto p-6 relative z-10">
        <h1 className="text-6xl font-bold text-orange-500 text-center mb-8 animate-bounce">Anon Thoughts</h1>
        
        <div className="bg-white bg-opacity-80 rounded-lg p-6 mb-8 transform rotate-1 hover:rotate-0 transition-transform duration-300">
          <h2 className="text-3xl font-bold text-orange-500 mb-4">About the Project</h2>
          <p className="text-lg">
            "Anon Thoughts" is a wild ride into the world of anonymous sharing! It's like a digital playground where 
            you can spill your thoughts, drop your ideas, or share your craziest stories without anyone knowing it's you. 
            Likes, comments, and categories? We've got 'em all! Plus, we've got themed days that'll knock your socks off. 
            Get ready for a rollercoaster of emotions, ideas, and maybe a few laughs along the way!
          </p>
        </div>

        <h2 className="text-4xl font-bold text-orange-500 text-center mb-8">Meet the Funky Bunch!</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {creators.map((creator, index) => (
            <div key={index} className={`bg-white bg-opacity-80 rounded-lg p-6 transform ${index % 2 === 0 ? 'rotate-2' : '-rotate-2'} hover:rotate-0 transition-transform duration-300`}>
              <h3 className="text-2xl font-bold text-orange-500 mb-2">{creator.name}</h3>
              <p className="text-lg mb-4">{creator.about}</p>
              <p className="text-sm text-gray-600 mb-4">CSE 3rd Year Student & Full-Stack Developer</p>
              <div className="flex justify-center space-x-4">
                <Link to={creator.linkedin} className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300">
                  LinkedIn
                </Link>
                <Link to={creator.github} className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-900 transition-colors duration-300">
                  GitHub
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}