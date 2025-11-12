import React from 'react';
import PropTypes from 'prop-types';

/**
 * DayButton Component
 * Individual day selector button for weekly navigation
 */
const DayButton = ({ day, activeDay, onClick }) => {
  // Map abbreviated day names to full names for comparison
  const dayMapping = {
    'mon': 'monday',
    'tue': 'tuesday',
    'wed': 'wednesday',
    'thr': 'thursday',
    'fri': 'friday',
    'sat': 'saturday',
    'sun': 'sunday'
  };
  
  const fullDayName = dayMapping[day.toLowerCase()];
  const isActive = fullDayName === activeDay;
  
  return (
    <button
      onClick={onClick}
      className={`
        w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold
        transition-colors duration-200
        ${isActive ? 'bg-blue-600 text-white' : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'}
      `}
      aria-label={`Select ${day}`}
      aria-pressed={isActive}
    >
      {day}
    </button>
  );
};

DayButton.propTypes = {
  day: PropTypes.string.isRequired,
  activeDay: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default DayButton;
