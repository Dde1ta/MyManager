import PropTypes from 'prop-types';
import NotesNode from './notesNode';
import NewNode from './newNote';
import { useNavigate } from 'react-router-dom';

function NoteOverview({ slots = [{
    category: "Error",
    title: "--NA--",
    subtitle: "Error in fetching data",
    pages: -1
  }] }){
    const navigate = useNavigate();

    const handleTimeTableClick = () => {
        navigate('/notes/folders');
    };
    console.log(slots);
    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Study Zone</h2>
            <div className="flex flex-col gap-4 hover:opacity-80" onClick={handleTimeTableClick}>
                {slots.map((note, index) => (
                <NotesNode key={index} {...note} />
                ))}
                <NewNode />
            </div>
        </div>
    )
}

NoteOverview.propTypes = {
  slots: PropTypes.oneOfType([
    
    PropTypes.shape({
        category: PropTypes.string,
        title: PropTypes.string,
        subtitle:PropTypes.string,
        pages: PropTypes.number
    }),
    
    PropTypes.arrayOf(
      PropTypes.shape({
        category: PropTypes.string,
        title: PropTypes.string,
        subtitle:PropTypes.string,
        pages: PropTypes.number
      })
    )
  ])
}

export default NoteOverview;