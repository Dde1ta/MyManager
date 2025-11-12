import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function BackButton(props = {to: "/"}){
    const navigate = useNavigate();
    const handleBackClick = (to) => {
        navigate(to);
    };
    return (
        <button 
            onClick={() => handleBackClick(props.to)}
            className="mb-6 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors flex items-center gap-2"
        >
            <span>←</span> Back to Home
        </button>
    );
}

BackButton.propTypes = {
    to: PropTypes.string
}

export default BackButton;