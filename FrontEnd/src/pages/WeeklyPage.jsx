import React, { useState, useEffect } from 'react';
import { weeklyScheduleData } from '../data/weeklyScheduleData.js';
import WeeklySchedule from '../components/weeklySchedule/WeeklySchedule.jsx';
import WeekNavigator from '../components/weekNavigation/WeekNavigator.jsx';
import BackButton from '../components/common/backbutton.jsx';

// LocalStorage key
const STORAGE_KEY = 'weeklyScheduleData';

/**
 * WeeklyPage Component
 * Displays editable weekly schedule with localStorage persistence
 * Features:
 * - Day-by-day navigation
 * - Add, edit, and delete time slots
 * - Persistent storage across sessions
 * - Reset to default schedule
 */
export default function WeeklyPage() {
  const [selectedDay, setSelectedDay] = useState('monday');
  const [scheduleData, setScheduleData] = useState(() => {
    // Load from localStorage or use default data
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : weeklyScheduleData;
  });

  // Save to localStorage whenever schedule changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scheduleData));
  }, [scheduleData]);

  const currentDaySchedule = scheduleData[selectedDay] || [];

  // Update schedule for the current day
  const handleScheduleChange = (updatedSchedule) => {
    setScheduleData(prev => ({
      ...prev,
      [selectedDay]: updatedSchedule
    }));
  };

  // Reset schedule to default
  const handleResetSchedule = () => {
    if (window.confirm('Are you sure you want to reset the schedule to default? This will delete all your custom changes.')) {
      setScheduleData(weeklyScheduleData);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8 relative">
      {/* Header with Back and Reset Buttons */}
      <div className="max-w-7xl mx-auto mb-4 flex justify-between items-center">
        <BackButton to="/" />
        <button
          onClick={handleResetSchedule}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
        >
          Reset to Default
        </button>
      </div>

      {/* Weekly Schedule Component */}
      <WeeklySchedule
        dayName={selectedDay}
        schedule={currentDaySchedule}
        onScheduleChange={handleScheduleChange}
      />

      {/* Week Navigator at Bottom */}
      <WeekNavigator
        selectedDay={selectedDay}
        onDaySelect={setSelectedDay}
      />
    </div>
  );
}