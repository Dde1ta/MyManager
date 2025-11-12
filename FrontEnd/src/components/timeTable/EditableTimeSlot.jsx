import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * EditableTimeSlot Component
 * Time slot card with edit and delete functionality
 */
const EditableTimeSlot = ({ 
  id, 
  time, 
  subject, 
  bgColor = 'bg-zinc-800', 
  barColor = 'bg-blue-500', 
  onEdit, 
  onDelete 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTime, setEditedTime] = useState(time);
  const [editedSubject, setEditedSubject] = useState(subject);

  const handleSave = () => {
    onEdit(id, {
      time: editedTime,
      subject: editedSubject
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTime(time);
    setEditedSubject(subject);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className={`flex flex-col ${bgColor} rounded-lg overflow-hidden shadow-lg w-full max-w-sm p-4 gap-3`}>
        {/* Edit Form */}
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={editedTime}
            onChange={(e) => setEditedTime(e.target.value)}
            className="bg-zinc-700 text-white px-3 py-2 rounded text-sm"
            placeholder="Time (e.g., 9:30 am - 11:10 am)"
          />
          <input
            type="text"
            value={editedSubject}
            onChange={(e) => setEditedSubject(e.target.value)}
            className="bg-zinc-700 text-white px-3 py-2 rounded text-lg font-bold"
            placeholder="Subject"
          />
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${bgColor} rounded-lg overflow-hidden shadow-lg w-full max-w-sm relative group`}>
      <div className="flex-1 p-4">
        <div className="text-sm text-zinc-400">{time}</div>
        <div className="text-xl font-bold text-white mt-1">{subject}</div>
      </div>
      <div className={`w-3 ${barColor}`}></div>
      
      {/* Action Buttons (shown on hover) */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold transition-colors"
          title="Edit"
        >
          ✎
        </button>
        <button
          onClick={() => onDelete(id)}
          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold transition-colors"
          title="Delete"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

EditableTimeSlot.propTypes = {
  id: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  barColor: PropTypes.string,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default EditableTimeSlot;
