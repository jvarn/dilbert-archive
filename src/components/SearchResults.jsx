function SearchResults({ results, onResultClick }) {
  const formatDateString = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-UK', options)
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">No results found</p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">Try a different search term</p>
      </div>
    )
  }

  return (
    <div id="results">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Search Results
        </h2>
        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-semibold">
          {results.length} {results.length === 1 ? 'result' : 'results'}
        </span>
      </div>
      <div className="space-y-4">
        {results.map((result) => (
          <div 
            key={result.date} 
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all cursor-pointer bg-gray-50 dark:bg-gray-900 hover:bg-white dark:hover:bg-gray-800"
            onClick={() => onResultClick(result.date)}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">
                    {formatDateString(result.date)}
                  </span>
                  {result.comic.title && (
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {result.comic.title}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {result.excerpt}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onResultClick(result.date)
                }}
                className="flex-shrink-0 bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 font-medium text-sm shadow-sm hover:shadow-md transition-all"
              >
                View →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchResults

