import React, { useState } from 'react';
import BackButton from '../components/common/backbutton.jsx';

// --- SVG Icons ---
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);
const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zM19.5 7.125l-8.932 8.931M16.862 4.487l-1.688 1.688" />
  </svg>
);
const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.54 0c-.342.052-.682.107-1.022.166m11.518 0l-2.897-2.897a1.125 1.125 0 00-1.591 0L9.42 5.79m11.518 0l-2.296 2.296m0 0l2.296 2.296m-2.296-2.296L12 11.83m0 0l-2.296-2.296m2.296 2.296L9.704 14.126" />
  </svg>
);

// --- Mock Data ---
const initialAlerts = [
  { id: 1, title: "Deadline: Assignment FLAT", date: "2025-11-11", priority: "High" },
  { id: 2, title: "Deadline: Practical files ADBMS", date: "2025-11-10", priority: "High" },
  { id: 3, title: "Submit project proposal", date: "2025-11-15", priority: "Medium" },
  { id: 4, title: "Study group for ML quiz", date: "2025-11-12", priority: "Low" },
];

// --- Reusable Components ---

/** Card for displaying a single alert */
const AlertCard = ({ alert, onEdit, onDelete }) => {
  
  // Helper to get color based on priority
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High': return 'border-red-500';
      case 'Medium': return 'border-yellow-500';
      case 'Low': return 'border-blue-500';
      default: return 'border-zinc-600';
    }
  };

  return (
    <div className={`bg-zinc-800 rounded-lg p-5 shadow-lg flex flex-col justify-between border-l-4 ${getPriorityClass(alert.priority)}`}>
      <div>
        <span className="text-sm text-zinc-400">{alert.date}</span>
        <h3 className="text-xl font-semibold text-white mt-1">{alert.title}</h3>
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className={`text-sm font-medium px-3 py-1 rounded-full bg-zinc-700 text-white`}>
          {alert.priority} Priority
        </span>
        <div className="flex gap-2 text-zinc-400">
          <button onClick={() => onEdit(alert)} className="hover:text-white transition-colors"><PencilIcon /></button>
          <button onClick={() => onDelete(alert.id)} className="hover:text-red-500 transition-colors"><TrashIcon /></button>
        </div>
      </div>
    </div>
  );
};

/** Modal (popup) for creating or editing an alert */
const AlertModal = ({ onClose, onSave, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [date, setDate] = useState(initialData?.date || "");
  const [priority, setPriority] = useState(initialData?.priority || "Medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date) return; // Simple validation
    onSave({ 
      id: initialData?.id || Date.now(), 
      title, 
      date, 
      priority 
    });
    onClose();
  };
  
  const isEditing = !!initialData;

  return (
    <div 
      className="fixed inset-0 bg-black/60 z-10 flex items-center justify-center"
      onClick={onClose}
    >
      <div 
        className="bg-zinc-800 w-full max-w-md rounded-lg shadow-xl p-6"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-white mb-6">
          {isEditing ? "Edit Alert" : "Create New Alert"}
        </h2>
        <form onSubmit={handleSubmit}>
          
          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-400 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full p-3 bg-zinc-700 text-white rounded-md border border-zinc-600 focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g., Submit Assignment"
            />
          </div>

          {/* Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-400 mb-2">Date</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full p-3 bg-zinc-700 text-white rounded-md border border-zinc-600 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Priority */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-zinc-400 mb-2">Priority</label>
            <select
              value={priority}
              onChange={e => setPriority(e.target.value)}
              className="w-full p-3 bg-zinc-700 text-white rounded-md border border-zinc-600 focus:border-blue-500 focus:ring-blue-500"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-zinc-600 text-white rounded-md font-medium hover:bg-zinc-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-500"
            >
              {isEditing ? "Save Changes" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


// --- Main Page Component ---

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAlert, setEditingAlert] = useState(null); // null = new, object = editing

  const handleCreateClick = () => {
    setEditingAlert(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (alert) => {
    setEditingAlert(alert);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (alertId) => {
    setAlerts(alerts.filter(a => a.id !== alertId));
  };

  const handleSave = (savedAlert) => {
    if (editingAlert) {
      // We are editing
      setAlerts(alerts.map(a => a.id === savedAlert.id ? savedAlert : a));
    } else {
      // We are creating
      setAlerts([savedAlert, ...alerts]);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header --- */}
        <div className="mb-8">
          <BackButton to="/" />
          <div className="flex justify-between items-center mt-4">
            <h1 className="text-4xl font-bold">Manage Alerts</h1>
            <button
              onClick={handleCreateClick}
              className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors"
            >
              <PlusIcon />
              <span>New Alert</span>
            </button>
          </div>
        </div>

        {/* --- Alerts Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
        
        {alerts.length === 0 && (
          <div className="text-center text-zinc-500 py-20">
            <h2 className="text-2xl font-semibold">No alerts found</h2>
            <p className="mt-2">Click "New Alert" to get started.</p>
          </div>
        )}

      </div>

      {/* Render the modal (popup) if isModalOpen is true */}
      {isModalOpen && (
        <AlertModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          initialData={editingAlert}
        />
      )}
    </div>
  );
}