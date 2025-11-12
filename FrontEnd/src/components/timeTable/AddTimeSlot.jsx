import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * AddTimeSlot Component
 * Form to add a new time slot to the schedule
 */
const AddTimeSlot = ({ onAdd, onCancel }) => {
  const [time, setTime] = useState('');
  const [subject, setSubject] = useState('');
  const [position, setPosition] = useState('start');
  const [barColor, setBarColor] = useState('bg-blue-500');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!time.trim() || !subject.trim()) {
      alert('Please fill in both time and subject fields');
      return;
    }

    onAdd({
      time: time.trim(),
      subject: subject.trim(),
      position,
      barColor,
      bgColor: 'bg-zinc-800'
    });

    // Reset form
    setTime('');
    setSubject('');
    setPosition('start');
    setBarColor('bg-blue-500');
  };

  const colorOptions = [
    { value: 'bg-blue-500', label: 'Blue', color: '#3b82f6' },
    { value: 'bg-green-500', label: 'Green', color: '#22c55e' },
    { value: 'bg-purple-500', label: 'Purple', color: '#a855f7' },
    { value: 'bg-red-600', label: 'Red', color: '#dc2626' },
    { value: 'bg-yellow-500', label: 'Yellow', color: '#eab308' },
    { value: 'bg-cyan-500', label: 'Cyan', color: '#06b6d4' },
    { value: 'bg-orange-500', label: 'Orange', color: '#f97316' },
    { value: 'bg-pink-500', label: 'Pink', color: '#ec4899' },
  ];

  return (
    <div className="bg-zinc-800 rounded-lg p-6 shadow-lg w-full max-w-sm">
      <h3 className="text-xl font-bold text-white mb-4">Add New Time Slot</h3>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Time Input */}
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Time</label>
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full bg-zinc-700 text-white px-3 py-2 rounded text-sm"
            placeholder="e.g., 9:30 am - 11:10 am"
          />
        </div>

        {/* Subject Input */}
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-zinc-700 text-white px-3 py-2 rounded text-sm"
            placeholder="e.g., Computer Networks"
          />
        </div>

        {/* Position Select */}
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Position</label>
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full bg-zinc-700 text-white px-3 py-2 rounded text-sm"
          >
            <option value="start">Left</option>
            <option value="center">Center</option>
            <option value="end">Right</option>
          </select>
        </div>

        {/* Color Select */}
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Bar Color</label>
          <div className="grid grid-cols-4 gap-2">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => setBarColor(color.value)}
                className={`
                  h-10 rounded border-2 transition-all
                  ${barColor === color.value ? 'border-white scale-110' : 'border-zinc-600'}
                `}
                style={{ backgroundColor: color.color }}
                title={color.label}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-2">
          <button
            type="submit"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium transition-colors"
          >
            Add
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

AddTimeSlot.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default AddTimeSlot;
