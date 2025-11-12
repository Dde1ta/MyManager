import PropTypes from 'prop-types';

function NotesNode({ 
    category = "Error",
    title = "--NA--",
    subtitle = "Error in fetching data",
    pages = -1,
    onClick
}){
    return (
        <div 
            onClick={onClick}
            className="bg-zinc-800 rounded-lg p-4 border-t-4 border-yellow-400 shadow-lg cursor-pointer hover:bg-zinc-700 transition-colors"
        >
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <div className="text-xs text-zinc-400 uppercase">{category}</div>
                    <div className="text-md font-semibold text-white mt-1">{title}</div>
                    <div className="text-sm text-zinc-400">{subtitle}</div>
                </div>
                <div className="text-xs text-zinc-300 bg-zinc-700 px-2 py-1 rounded-full ml-2">
                    {pages}
                </div>
            </div>
        </div>
    )
};

NotesNode.propTypes = {
    category: PropTypes.string,
    title: PropTypes.string,
    subtitle:PropTypes.string,
    pages: PropTypes.number,
    onClick: PropTypes.func
}

export default NotesNode;