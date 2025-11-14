import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditableTimeSlot from '../timeTable/EditableTimeSlot.jsx';
import AddTimeSlot from '../timeTable/AddTimeSlot.jsx';

/**
 * WeeklySchedule Component
 * Displays the schedule for a selected day with proper positioning
 * Calls API functions passed from parent for add, edit, delete
 */
const WeeklySchedule = ({ 
  dayName, 
  schedule, 
  // --- UPDATED PROPS ---
  onAddSlot,
  onEditSlot,
  onDeleteSlot
}) => {
  const [isAdding, setIsAdding] = useState(false);

  // Helper to determine justify class for TimeSlot positioning
  const getJustifyClass = (position) => {
    switch (position) {
      case 'start': return 'justify-start';
      case 'center': return 'justify-center';
      case 'end': return 'justify-end';
      default: return 'justify-start';
    }
  };

  // --- UPDATED: These handlers now call the API props ---
  const handleEdit = (id, updatedData) => {
    onEditSlot(id, updatedData);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this time slot?')) {
      onDeleteSlot(id);
    }
  };

  const handleAdd = (newSlotData) => {
    onAddSlot(newSlotData);
    setIsAdding(false);
  };

  return (
    <div className="max-w-7xl mx-auto pb-24">
      {/* Day Title and Add Button */}
      <div className="flex items-center justify-between mb-12">
        <div className="bg-zinc-800 rounded-lg p-4 shadow-lg">
          <h1 className="text-4xl font-bold">
            {dayName.charAt(0).toUpperCase() + dayName.slice(1)}
          </h1>
        </div>
        
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg"
          >
            <span className="text-xl">+</span> Add Time Slot
          </button>
        )}
      </div>

      {/* Schedule Grid */}
      <div className="flex flex-col gap-6">
        {/* Add New Time Slot Form */}
        {isAdding && (
          <div className="flex justify-center w-full">
            <AddTimeSlot
              onAdd={handleAdd}
              onCancel={() => setIsAdding(false)}
            />
          </div>
        )}

        {/* Existing Time Slots */}
        {schedule.length > 0 ? (
          schedule.map((item) => (
            <div 
              key={item.id} 
              className={`flex ${getJustifyClass(item.position)} w-full`}
            >
              <EditableTimeSlot
                id={item.id}
                time={item.time}
                subject={item.subject}
                bgColor={item.bgColor}
                barColor={item.barColor}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          ))
        ) : !isAdding ? (
          <div className="text-zinc-400 text-center text-xl py-20">
            No schedule available for {dayName.charAt(0).toUpperCase() + dayName.slice(1)}.
            <br />
            <button
              onClick={() => setIsAdding(true)}
              className="mt-4 text-green-400 hover:text-green-300 underline"
            >
              Add your first time slot
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

WeeklySchedule.propTypes = {
  dayName: PropTypes.string.isRequired,
  schedule: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      time: PropTypes.string.isRequired,
      subject: PropTypes.string.isRequired,
      bgColor: PropTypes.string,
      barColor: PropTypes.string,
      position: PropTypes.oneOf(['start', 'center', 'end'])
    })
  ).isRequired,
  // --- UPDATED PROPTYPES ---
  onAddSlot: PropTypes.func.isRequired,
  onEditSlot: PropTypes.func.isRequired,
  onDeleteSlot: PropTypes.func.isRequired
};

export default WeeklySchedule;