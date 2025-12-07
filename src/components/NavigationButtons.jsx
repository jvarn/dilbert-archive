function NavigationButtons({ currentDate, onNavigate }) {
  const buttonClass = "flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg font-medium text-sm transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
  const primaryButtonClass = `${buttonClass} bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 active:bg-blue-800 dark:active:bg-blue-700`
  const secondaryButtonClass = `${buttonClass} bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 active:bg-gray-300 dark:active:bg-gray-500`

  return (
    <div className="flex justify-center items-center gap-2 flex-nowrap overflow-x-auto">
      <button
        onClick={() => onNavigate('first', currentDate)}
        className={secondaryButtonClass}
        title="First comic"
        aria-label="Go to first comic"
      >
        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
        <span className="hidden xl:inline">First</span>
      </button>
      <button
        onClick={() => onNavigate('previous', currentDate)}
        className={primaryButtonClass}
        title="Previous comic (←)"
        aria-label="Go to previous comic"
      >
        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="hidden xl:inline">Previous</span>
      </button>
      <button
        onClick={() => onNavigate('random', currentDate)}
        className={secondaryButtonClass}
        title="Random comic"
        aria-label="Go to random comic"
      >
        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span className="hidden xl:inline">Random</span>
      </button>
      <button
        onClick={() => onNavigate('next', currentDate)}
        className={primaryButtonClass}
        title="Next comic (→)"
        aria-label="Go to next comic"
      >
        <span className="hidden xl:inline">Next</span>
        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <button
        onClick={() => onNavigate('last', currentDate)}
        className={secondaryButtonClass}
        title="Last comic"
        aria-label="Go to last comic"
      >
        <span className="hidden xl:inline">Last</span>
        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

export default NavigationButtons

