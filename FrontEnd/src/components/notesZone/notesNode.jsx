import PropTypes from 'prop-types';

// Trash Icon Component
const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.54 0c-.342.052-.682.107-1.022.166m11.518 0l-2.897-2.897a1.125 1.125 0 00-1.591 0L9.42 5.79m11.518 0l-2.296 2.296m0 0l2.296 2.296m-2.296-2.296L12 11.83m0 0l-2.296-2.296m2.296 2.296L9.704 14.126" />
  </svg>
);

function NotesNode({ 
    category = "General",
    title = "Untitled",
    subtitle = "",
    pages,
    onClick,
    onDelete // New Prop
}){
    return (
        <div 
            onClick={onClick}
            className="bg-zinc-800 rounded-lg p-4 border-t-4 border-yellow-400 shadow-lg cursor-pointer hover:bg-zinc-700 transition-colors relative group"
        >
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <div className="text-xs text-zinc-400 uppercase">{category}</div>
                    <div className="text-md font-semibold text-white mt-1 truncate pr-2">{title}</div>
                    <div className="text-sm text-zinc-400">{subtitle}</div>
                </div>
                
                {/* Only show pages if valid number */}
                {pages > 0 && (
                    <div className="text-xs text-zinc-300 bg-zinc-700 px-2 py-1 rounded-full ml-2">
                        {pages}
                    </div>
                )}
            </div>

            {/* Delete Button - Shows on Hover */}
            {onDelete && (
                <button 
                    onClick={onDelete}
                    className="absolute top-3 right-3 text-zinc-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-zinc-600"
                >
                    <TrashIcon />
                </button>
            )}
        </div>
    )
};

NotesNode.propTypes = {
    category: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    pages: PropTypes.any,
    onClick: PropTypes.func,
    onDelete: PropTypes.func
}

export default NotesNode;