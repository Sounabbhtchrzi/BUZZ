import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
export default function Component() {
  const [backgroundEmojis, setBackgroundEmojis] = useState<string[]>([])

  useEffect(() => {
    const emojis = ["😀", "😎", "🤪", "🥳", "🚀", "🌈", "🍕", "🎉", "🦄", "🐶", "🌟", "🎸"]
    const newBackgroundEmojis = Array.from({ length: 500 }, () => emojis[Math.floor(Math.random() * emojis.length)])
    setBackgroundEmojis(newBackgroundEmojis)
  }, [])

  const creators = [
    {
      name: "Snikdhendu Pramanik",
      about: "The dynamic striker who crafts stunning interfaces and scores big with user satisfaction, bringing creativity to every project!",
      linkedin: "https://www.linkedin.com/in/snikdhendu-pramanik",
      github: "https://github.com/snikdhendu",
      avatar: "/snikdhendu.png?height=200&width=200",
    },
    {
      name: "Sounab Bhattacharjee",
      about: "The versatile midfielder who connects all the pieces, ensuring seamless collaboration and a great user experience throughout the project!",
      linkedin: "https://www.linkedin.com/in/sounab-bhattacharjee-aa3b3b266/",
      github: "https://github.com/Sounabbhtchrzi",
      avatar: "/sounab.jpg?height=200&width=200",
    },
    {
      name: "Shreyam Kundu",
      about: "The solid defender who keeps the code bug-free and makes sure everything runs smoothly, ensuring a strong foundation for the project!",
      linkedin: "https://www.linkedin.com/in/shreyamkundu/",
      github: "https://github.com/ShreyamKundu",
      avatar: "/shreyam.webp?height=200&width=200",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-orange-100 font-sans relative overflow-hidden">
      {/* Emoji Background */}
      <div className="absolute inset-0 opacity-10 flex flex-wrap justify-center items-center pointer-events-none">
        {backgroundEmojis.map((emoji, index) => (
          <span key={index} className="text-2xl p-2">
            {emoji}
          </span>
        ))}
      </div>

      <div className="container mx-auto p-6 relative z-10">
        <h1 className="text-6xl font-bold text-orange-500 text-center mb-8">      
          <Link to='/' className="group">
          <h1 className="lg:text-6xl text-3xl font-extrabold relative">
            <span className="inline-block transform hover:scale-150 transition-transform duration-300 text-orange-500">B</span>
            <span className="inline-block transform hover:rotate-180 transition-transform duration-300 text-orange-600">U</span>
            <span className="inline-block transform hover:skew-y-12 transition-transform duration-300 text-orange-700">Z</span>
            <span className="inline-block transform hover:-skew-y-12 transition-transform duration-300 text-orange-800">Z</span>
          </h1>
        </Link></h1>

        <p className="text-xl text-orange-600 text-center mb-8 italic">
          Anonymous thoughts, real connections
        </p>

        <div className="bg-white bg-opacity-80 rounded-lg p-6 mb-8 transform rotate-1 hover:rotate-0 transition-transform duration-300">
          <h2 className="text-3xl font-bold text-orange-500 mb-4">About the Project</h2>
          <p className="text-lg mb-2">
            <strong>Welcome to Buzz</strong> – where your thoughts are anonymous, but your impact is real.
          </p>
          <p className="text-lg">
            Share what's on your mind, explore <strong>All</strong>, <strong>Hot</strong>, or <strong>New</strong>{" "}
            posts, and if you need inspiration, check out <strong>Themes</strong> – a fresh topic every day, gone in 24
            hours.
          </p>
          <p className="text-lg">
            Like, comment, and see how your words resonate. Ready to dive into the Buzz? Join the conversation now.
          </p>
        </div>

        <h2 className="text-4xl font-bold text-orange-500 text-center mb-8">Meet the Funky Bunch!</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {creators.map((creator, index) => (
            <div
              key={index}
              className={`bg-white bg-opacity-80 rounded-lg p-6 transform ${index % 2 === 0 ? "rotate-2" : "-rotate-2"
                } hover:rotate-0 transition-transform duration-300`}
            >
              <div className="flex flex-col items-center mb-4">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-orange-500 mb-4">
                  <img src={creator.avatar} alt={creator.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-bold text-orange-500 mb-2 text-center">{creator.name}</h3>
              </div>
              <p className="text-lg mb-4 text-center">{creator.about}</p>
              <p className="text-sm text-gray-600 mb-4 text-center">CSE 3rd Year Student & Full-Stack Developer</p>
              <div className="flex justify-center space-x-4">
                <a
                  href={creator.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
                >
                  LinkedIn
                </a>
                <a
                  href={creator.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-900 transition-colors duration-300"
                >
                  GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}



// import { useState, useEffect } from "react";

// export default function Component() {
//   const [backgroundEmojis, setBackgroundEmojis] = useState<string[]>([]);

//   useEffect(() => {
//     const emojis = [
//       "😀",
//       "😎",
//       "🤪",
//       "🥳",
//       "🚀",
//       "🌈",
//       "🍕",
//       "🎉",
//       "🦄",
//       "🐶",
//       "🌟",
//       "🎸",
//     ];
//     const newBackgroundEmojis = Array.from(
//       { length: 500 },
//       () => emojis[Math.floor(Math.random() * emojis.length)]
//     );
//     setBackgroundEmojis(newBackgroundEmojis);
//   }, []);

//   const creators = [
//     {
//       name: "Shreyam Kundu",
//       about: "The solid defender who keeps the code bug-free and makes sure everything runs smoothly, ensuring a strong foundation for the project!",
//       linkedin: "https://www.linkedin.com/in/shreyamkundu/",
//       github: "https://github.com/ShreyamKundu",
//     },
//     {
//       name: "Snikdhendu Pramanik",
//       about: "The dynamic striker who crafts stunning interfaces and scores big with user satisfaction, bringing creativity to every project!",
//       linkedin: "https://www.linkedin.com/in/snikdhendu-pramanik",
//       github: "https://github.com/snikdhendu",
//     },
//     {
//       name: "Sounab Bhattacharjee",
//       about: "The versatile midfielder who connects all the pieces, ensuring seamless collaboration and a great user experience throughout the project!",
//       linkedin: "https://www.linkedin.com/in/sounab-bhattacharjee-aa3b3b266/",
//       github: "https://github.com/Sounabbhtchrzi",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-white to-orange-100 font-sans relative overflow-hidden">
//       {/* Emoji Background */}
//       <div className="absolute inset-0 opacity-10 flex flex-wrap justify-center items-center pointer-events-none">
//         {backgroundEmojis.map((emoji, index) => (
//           <span key={index} className="text-2xl p-2">
//             {emoji}
//           </span>
//         ))}
//       </div>

//       <div className="container mx-auto p-6 relative z-10">
//         <h1 className="text-6xl font-bold text-orange-500 text-center mb-8">
//           BUZZ
//         </h1>

//         <div className="bg-white bg-opacity-80 rounded-lg p-6 mb-8 transform rotate-1 hover:rotate-0 transition-transform duration-300">
//           <h2 className="text-3xl font-bold text-orange-500 mb-4">
//             About the Project
//           </h2>
//           <p className="text-lg mb-2">
//             <strong>Welcome to Buzz</strong> – where your thoughts are anonymous, but your impact is real.
//           </p>
//           <p className="text-lg">
//             Share what’s on your mind, explore <strong>All</strong>, <strong>Hot</strong>, or <strong>New</strong> posts, and if you need inspiration, check out <strong>Themes</strong> – a fresh topic every day, gone in 24 hours.
//           </p>
//           <p className="text-lg">
//             Like, comment, and see how your words resonate. Ready to dive into the Buzz? Join the conversation now.
//           </p>
//         </div>

//         <h2 className="text-4xl font-bold text-orange-500 text-center mb-8">
//           Meet the Funky Bunch!
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {creators.map((creator, index) => (
//             <div
//               key={index}
//               className={`bg-white bg-opacity-80 rounded-lg p-6 transform ${
//                 index % 2 === 0 ? "rotate-2" : "-rotate-2"
//               } hover:rotate-0 transition-transform duration-300`}
//             >
//               <h3 className="text-2xl font-bold text-orange-500 mb-2">
//                 {creator.name}
//               </h3>
//               <p className="text-lg mb-4">{creator.about}</p>
//               <p className="text-sm text-gray-600 mb-4">
//                 CSE 3rd Year Student & Full-Stack Developer
//               </p>
//               <div className="flex justify-center space-x-4">
//                 <a
//                   href={creator.linkedin}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
//                 >
//                   LinkedIn
//                 </a>
//                 <a
//                   href={creator.github}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-900 transition-colors duration-300"
//                 >
//                   GitHub
//                 </a>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
