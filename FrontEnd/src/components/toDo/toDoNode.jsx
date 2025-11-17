import PropTypes from "prop-types";

function ToDoNode({ 
    id,
    category,
    description,
    tag,
    status,
    onStatusChange,
    onDelete
}){
    // Map status integer to Tailwind classes
    const getStatusColor = (s) => {
        if (s === 0) return "bg-red-500";     // Pending
        if (s === 1) return "bg-orange-500";  // Doing
        if (s === 2) return "bg-green-500";   // Done
        return "bg-zinc-700";
    };

    const handleClick = () => {
        // Cycle status: 0 -> 1 -> 2 -> 0
        const newStatus = (status + 1) % 3;
        onStatusChange(id, newStatus);
    };
    
    const handleDelete = (e) => {
        e.stopPropagation();
        if(window.confirm("Delete this task?")) {
            onDelete(id);
        }
    }

    return (
        <div 
            onClick={handleClick} 
            className={`${getStatusColor(status)} rounded-lg p-4 flex justify-between items-center text-white shadow-lg cursor-pointer transition-colors relative group`}
        >
            <div>
                <div className="font-bold text-lg">{category}</div>
                <div className="text-sm text-zinc-100 opacity-90">{description}</div>
            </div>
            <div className="flex flex-col items-end">
                <span className="font-semibold bg-black/20 px-2 py-1 rounded text-xs mb-1">{tag}</span>
            </div>
            
            {/* Delete Button (Hover only) */}
            <button 
                onClick={handleDelete}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-white hover:text-red-200 font-bold px-2"
            >
                ✕
            </button>
        </div>
    );
}

ToDoNode.propTypes = {
    id: PropTypes.number,
    category: PropTypes.string,
    description: PropTypes.string,
    tag: PropTypes.string,
    status: PropTypes.number,
    onStatusChange: PropTypes.func,
    onDelete: PropTypes.func
}

export default ToDoNode;