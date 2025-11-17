import PropTypes from 'prop-types';
import NotesNode from './notesNode';
import NewNode from './newNote';
import { useNavigate } from 'react-router-dom';

function NoteOverview({ slots = [] }){
    const navigate = useNavigate();

    // Navigate to the specific folder
    const handleFolderClick = (folderId) => {
        navigate(`/notes/folder/${folderId}`);
    };

    // Navigate to "All Folders" view
    const handleViewAllClick = () => {
        navigate('/notes/folders');
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Study Zone</h2>
            <div className="flex flex-col gap-4">
                {/* Map slots to notes and pass specific click handler */}
                {slots.map((note, index) => (
                    <NotesNode 
                        key={index} 
                        {...note} 
                        onClick={() => handleFolderClick(note.id)} 
                    />
                ))}
                {/* Only the "New" button goes to the folders page */}
                <div onClick={handleViewAllClick} className="cursor-pointer">
                    <NewNode />
                </div>
            </div>
        </div>
    )
}

NoteOverview.propTypes = {
  slots: PropTypes.array
}

export default NoteOverview;