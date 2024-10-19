import { useState } from 'react'

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('hot')

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-4 mt-6">

      <div className="flex justify-between border-b border-orange-200">
        <button
          className={`px-4 py-2 text-lg font-semibold ${
            activeTab === 'hot' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-orange-500'
          }`}
          onClick={() => setActiveTab('hot')}
        >
          🔥 Hot
        </button>
        <button
          className={`px-4 py-2 text-lg font-semibold ${
            activeTab === 'new' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-orange-500'
          }`}
          onClick={() => setActiveTab('new')}
        >
          ✨ New
        </button>
        <button
          className={`px-4 py-2 text-lg font-semibold ${
            activeTab === 'top' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-orange-500'
          }`}
          onClick={() => setActiveTab('top')}
        >
          💡 Theme
        </button>
      </div>
    </div>
  )
}

export default Tabs