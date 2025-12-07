import { useState } from 'react'

function TranscriptPanel({ date, comic }) {
  const [showTranscript, setShowTranscript] = useState(false)
  
  if (!comic) return null

  return (
    <div role="document" aria-labelledby={`comic-${date}-transcript`} className="mb-6">
      <button
        onClick={() => setShowTranscript(!showTranscript)}
        className="flex items-center justify-between w-full gap-2 mb-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        aria-expanded={showTranscript}
        aria-controls={`transcript-content-${date}`}
      >
        <div className="flex items-center gap-2">
          <svg className={`w-4 h-4 text-blue-600 dark:text-blue-400 transition-transform ${showTranscript ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 id={`comic-${date}-transcript`} className="text-sm md:text-base font-bold text-gray-800 dark:text-gray-100">
            Transcript
          </h3>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300">
          {showTranscript ? 'Hide' : 'Show'}
        </span>
      </button>
      {showTranscript && (
        <div 
          id={`transcript-content-${date}`}
          className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700 animate-fadeIn max-h-96 overflow-y-auto"
        >
          <p id="transcript" className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line font-mono text-xs md:text-sm">
            {comic.transcript}
          </p>
        </div>
      )}
    </div>
  )
}

export default TranscriptPanel

