import { useState, useEffect } from 'react'
import DatePickerLib from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const parseLocalDate = (dateString) => {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day) // local midnight, not UTC
}

const formatLocalDate = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function DatePicker({ value, onChange, minDate, maxDate }) {
  const [selectedDate, setSelectedDate] = useState(
    value ? parseLocalDate(value) : null
  )

  // Update selectedDate when value prop changes
  useEffect(() => {
    if (value) {
      setSelectedDate(parseLocalDate(value))
    }
  }, [value])

  const handleDateChange = (date) => {
    setSelectedDate(date)
    if (date) {
      const formattedDate = formatLocalDate(date) 
      onChange(formattedDate)
    }
  }

  return (
    <div className="relative flex-1">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
        <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <DatePickerLib
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        minDate={parseLocalDate(minDate)}
        maxDate={parseLocalDate(maxDate)}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
        placeholderText="Select a date"
      />
    </div>
  )
}

export default DatePicker

