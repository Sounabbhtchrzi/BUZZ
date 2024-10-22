import { useState } from 'react'
import { Send } from 'lucide-react'

export default function FunkyFeedbackForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      alert('Email is required')
      return
    }
    // Handle form submission logic here
    alert(`Thank you for your funky feedback, ${name || 'Anonymous'}!`)
  }
  console.log(name);
  console.log(email);
  console.log(message);
  

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-orange-500 mb-6">Share your Feedback !!!</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-orange-500 font-semibold mb-2" htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border-2 border-orange-300 rounded-full focus:outline-none focus:border-orange-500 transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-orange-500 font-semibold mb-2" htmlFor="email">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border-2 border-orange-300 rounded-full focus:outline-none focus:border-orange-500 transition-colors"
            placeholder="Your email"
            required
          />
        </div>
        <div className="col-span-2">
          <label className="block text-orange-500 font-semibold mb-2" htmlFor="message">Your Funky Feedback</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-2 border-2 border-orange-300 rounded-2xl focus:outline-none focus:border-orange-500 transition-colors"
            placeholder="Share your thoughts!"
            rows={3}
          />
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-bold py-3 px-6 rounded-full hover:bg-orange-600 transition-colors duration-300 flex items-center justify-center"
          >
            <Send className="mr-2" size={20} />
            Send Your Feedback
          </button>
        </div>
      </form>
    </div>
  )
}