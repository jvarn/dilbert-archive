import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function FavoritesPanel({ favorites, setFavorites }) {
  const [showFavorites, setShowFavorites] = useState(false)
  const navigate = useNavigate()
  const { date: currentDate } = useParams()

  return (
    <div role="document" aria-labelledby={`favorites`} className="mb-6">
      <button
        onClick={() => setShowFavorites(!showFavorites)}
        className="flex items-center justify-between w-full gap-2 mb-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        aria-expanded={showFavorites}
        aria-controls={`favorites-panel`}
      >
        <div className="flex items-center gap-2">
          <svg
            className={`w-4 h-4 text-blue-600 dark:text-blue-400 transition-transform ${showFavorites ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          <svg
            className="w-5 h-5 text-blue-600 dark:text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="butt" strokeLinejoin="miter" strokeWidth={2} d="M12 3l2.9 6.26L22 9.27l-5 4.87L18.8 21 12 17.77 5.2 21 7 14.14 2 9.27l7.1-.01L12 3z" />
          </svg>
          <h3 id={`favorites`} className="text-sm md:text-base font-bold text-gray-800 dark:text-gray-100">
            Favorites
          </h3>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300">
          {showFavorites ? 'Hide' : 'Show'}
        </span>
      </button>

      {showFavorites && (
        <div
          id={`favorites-panel`}
          className="text-white bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700 animate-fadeIn max-h-96 overflow-y-auto"
        >
          {favorites.length > 0 ? (
            favorites.map((date) => (
              <button
                key={date}
                onClick={() => navigate(`/comic/${date}`)}
                className={`inline-block px-3 py-2 mr-2 mb-2 rounded-lg transition-colors text-sm ${
                  date === currentDate
                    ? 'bg-blue-800 scale-105'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {date}
              </button>
            ))
          ) : (
            <p>Click the star to favorite comics.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default FavoritesPanel