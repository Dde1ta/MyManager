import { useState } from "react";

const AddFolderModal = ({ onClose, onCreate }) => {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("blue");
  const availableColors = ['blue', 'green', 'purple', 'red', 'orange', 'teal', 'pink'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return; // Simple validation
    onCreate({ id: Date.now(), title, color });
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 z-10 flex items-center justify-center"
      onClick={onClose}
    >
      <div 
        className="bg-zinc-800 w-full max-w-md rounded-lg shadow-xl p-6"
        onClick={e => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <h2 className="text-2xl font-bold text-white mb-6">Create New Folder</h2>
        <form onSubmit={handleSubmit}>
          {/* Folder Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-400 mb-2">Folder Name</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full p-3 bg-zinc-700 text-white rounded-md border border-zinc-600 focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g., Computer Networks"
            />
          </div>

          {/* Color Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-zinc-400 mb-2">Color</label>
            <div className="flex flex-wrap gap-3">
              {availableColors.map(colorName => (
                <button
                  type="button"
                  key={colorName}
                  onClick={() => setColor(colorName)}
                  className={`w-10 h-10 rounded-full bg-${colorName}-500 border-4 ${
                    color === colorName ? 'border-white' : 'border-transparent'
                  } transition-all`}
                />
              ))}
            </div>
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
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFolderModal;