import React from 'react';
import PropTypes from 'prop-types';
import DayButton from './DayButton.jsx';

/**
 * WeekNavigator Component
 * Fixed bottom navigation bar showing all days of the week
 */
const WeekNavigator = ({ selectedDay, onDaySelect }) => {
  // Map abbreviated day names to full day names
  const dayMapping = {
    'Mon': 'monday',
    'Tue': 'tuesday',
    'Wed': 'wednesday',
    'Thr': 'thursday',
    'Fri': 'friday',
    'Sat': 'saturday',
    'Sun': 'sunday'
  };

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun'];

  const handleDayClick = (dayAbbr) => {
    const fullDayName = dayMapping[dayAbbr];
    onDaySelect(fullDayName);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-800 p-4 shadow-lg flex justify-center space-x-4 z-50">
      {daysOfWeek.map((day) => (
        <DayButton
          key={day}
          day={day}
          activeDay={selectedDay}
          onClick={() => handleDayClick(day)}
        />
      ))}
    </div>
  );
};

WeekNavigator.propTypes = {
  selectedDay: PropTypes.string.isRequired,
  onDaySelect: PropTypes.func.isRequired
};

export default WeekNavigator;
