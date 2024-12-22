import { useState } from 'react';

interface CalendarProps {
  onDateSelect?: (date: Date) => void;
  selectedDate?: Date;
  minDate?: Date;
  maxDate?: Date;
}

export default function Calendar({ onDateSelect, selectedDate = new Date(), minDate, maxDate }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const generateCalendarDays = () => {
    const days = [];
    const previousMonthDays = new Date(currentYear, currentMonth, 0).getDate();

    // Previous month days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        day: previousMonthDays - i,
        isCurrentMonth: false,
        isPast: true
      });
    }

    // Current month days
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const isDisabled = (minDate && date < minDate) ?? (maxDate && date > maxDate);
      
      days.push({
        day: i,
        isCurrentMonth: true,
        isToday: 
          i === today.getDate() && 
          currentMonth === today.getMonth() && 
          currentYear === today.getFullYear(),
        isSelected: 
          i === selectedDate.getDate() && 
          currentMonth === selectedDate.getMonth() && 
          currentYear === selectedDate.getFullYear(),
        isDisabled
      });
    }

    // Next month days
    const remainingDays = 42 - days.length; // 6 rows * 7 days = 42
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        isFuture: true
      });
    }

    return days;
  };

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (day: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return;
    
    const selectedDate = new Date(currentYear, currentMonth, day);
    if (minDate && selectedDate < minDate) return;
    if (maxDate && selectedDate > maxDate) return;
    
    onDateSelect?.(selectedDate);
  };

  return (
    <div className="bg-dark-100 rounded-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handlePreviousMonth}
          className="p-2 hover:bg-dark-200 rounded-xl text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex items-center space-x-2">
          <select
            value={currentMonth}
            onChange={(e) => { setCurrentMonth(parseInt(e.target.value)); }}
            className="bg-dark-200 text-black px-3 py-1 rounded-xl"
          >
            {months.map((month, index) => (
              <option key={month} value={index} className="text-black">{month}</option>
            ))}
          </select>
          <select
            value={currentYear}
            onChange={(e) => { setCurrentYear(parseInt(e.target.value)); }}
            className="bg-dark-200 text-black px-3 py-1 rounded-xl"
          >
            {Array.from({ length: 10 }, (_, i) => currentYear - 5 + i).map(year => (
              <option key={year} value={year} className="text-black">{year}</option>
            ))}
          </select>
        </div>
        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-dark-200 rounded-xl text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-gray-400 text-sm py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {generateCalendarDays().map((day, index) => (
          <button
            key={index}
            onClick={() => { handleDateClick(day.day, day.isCurrentMonth); }}
            disabled={day.isDisabled}
            className={`
              p-2 rounded-xl text-center transition-colors
              ${day.isCurrentMonth 
                ? day.isToday
                  ? 'bg-[#333e48] text-white'
                  : day.isSelected
                    ? 'bg-[#333e48] text-white'
                    : 'text-white hover:bg-dark-200'
                : 'text-gray-600'
              }
              ${day.isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {day.day}
          </button>
        ))}
      </div>
    </div>
  );
}
