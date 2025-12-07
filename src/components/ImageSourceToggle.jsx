function ImageSourceToggle({ value, onChange }) {
  const handleToggle = (e) => {
    const newValue = e.target.checked
    localStorage.setItem('useLocalImages', newValue.toString())
    onChange(newValue)
  }

  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          checked={value}
          onChange={handleToggle}
          className="sr-only"
        />
        <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${
          value ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
        }`}>
          <div className={`w-5 h-5 bg-white dark:bg-gray-200 rounded-full shadow-md transform transition-transform duration-200 mt-0.5 ${
            value ? 'translate-x-5' : 'translate-x-0.5'
          }`}></div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <svg className={`w-5 h-5 transition-colors ${value ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
        <span className={`text-sm font-medium transition-colors ${
          value ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
        }`}>
          Use local images
        </span>
      </div>
    </label>
  )
}

export default ImageSourceToggle

