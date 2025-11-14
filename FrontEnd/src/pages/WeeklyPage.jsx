import React, { useState, useEffect } from 'react';
// import { weeklyScheduleData } from '../data/weeklyScheduleData.js'; // <-- REMOVED
import WeeklySchedule from '../components/weeklySchedule/WeeklySchedule.jsx';
import WeekNavigator from '../components/weekNavigation/WeekNavigator.jsx';
import BackButton from '../components/common/backbutton.jsx';
import apiClient from '../api/apiClient'; // <-- IMPORT API CLIENT

// LocalStorage key
// const STORAGE_KEY = 'weeklyScheduleData'; // <-- REMOVED

export default function WeeklyPage() {
  const [selectedDay, setSelectedDay] = useState('monday');
  const [scheduleData, setScheduleData] = useState({}); // <-- Start with empty object
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // --- FETCH DATA FROM BACKEND ---
  useEffect(() => {
    const fetchSchedule = async () => {
      setIsLoading(true);
      setError('');
      try {
        // Fetch the entire schedule map from GET /api/schedule
        const response = await apiClient.get('/schedule');
        setScheduleData(response.data);
      } catch (err) {
        console.error("Failed to fetch schedule:", err);
        setError("Could not load your schedule.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSchedule();
  }, []); // Runs once on page load

  // --- API HANDLERS ---

  const handleAddSlot = async (newSlotData) => {
    // Add the current day to the slot data
    const completeSlotData = {
      ...newSlotData,
      dayOfWeek: selectedDay
    };
    
    try {
      // POST /api/schedule
      const response = await apiClient.post('/schedule', completeSlotData);
      const newSlot = response.data; // This is the new slot with a real ID
      
      // Update state
      setScheduleData(prev => {
        const daySchedule = prev[selectedDay] || [];
        return {
          ...prev,
          [selectedDay]: [...daySchedule, newSlot]
        };
      });
    } catch (err) {
      console.error("Failed to add slot:", err);
      setError("Could not add the new time slot.");
    }
  };

  const handleEditSlot = async (slotId, updatedData) => {
    try {
      // PUT /api/schedule/{slotId}
      const response = await apiClient.put(`/schedule/${slotId}`, updatedData);
      const updatedSlot = response.data;

      // Update state
      setScheduleData(prev => {
        const daySchedule = prev[selectedDay] || [];
        return {
          ...prev,
          [selectedDay]: daySchedule.map(slot => 
            slot.id === slotId ? updatedSlot : slot
          )
        };
      });
    } catch (err) {
      console.error("Failed to edit slot:", err);
      setError("Could not update the time slot.");
    }
  };

  const handleDeleteSlot = async (slotId) => {
    try {
      // DELETE /api/schedule/{slotId}
      await apiClient.delete(`/schedule/${slotId}`);
      
      // Update state
      setScheduleData(prev => {
        const daySchedule = prev[selectedDay] || [];
        return {
          ...prev,
          [selectedDay]: daySchedule.filter(slot => slot.id !== slotId)
        };
      });
    } catch (err) {
      console.error("Failed to delete slot:", err);
      setError("Could not delete the time slot.");
    }
  };

  const currentDaySchedule = scheduleData[selectedDay] || [];

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8 relative">
      {/* Header with Back Button */}
      <div className="max-w-7xl mx-auto mb-4 flex justify-between items-center">
        <BackButton to="/" />
        {/* Reset button removed as it's not connected to an API */}
      </div>

      {/* --- ADDED: Loading and Error States --- */}
      {isLoading && <p className="text-center text-zinc-400 text-xl py-20">Loading schedule...</p>}
      {error && <p className="text-center text-red-500 text-xl py-20">{error}</p>}
      
      {!isLoading && !error && (
        <WeeklySchedule
          dayName={selectedDay}
          schedule={currentDaySchedule}
          // --- PASS API HANDLERS DOWN ---
          onAddSlot={handleAddSlot}
          onEditSlot={handleEditSlot}
          onDeleteSlot={handleDeleteSlot}
        />
      )}

      {/* Week Navigator at Bottom */}
      <WeekNavigator
        selectedDay={selectedDay}
        onDaySelect={setSelectedDay}
      />
    </div>
  );
}