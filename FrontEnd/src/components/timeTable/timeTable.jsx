import TimeSlot from "./timeSlot";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function TimeTable({ slot, slots }){
    // Accept either `slot` (existing prop) or `slots` (plural) and default to empty array
    const items = slots || slot || [];
    const navigate = useNavigate();

    const handleTimeTableClick = () => {
        navigate('/weekly');
    };

    return (
        <div 
            onClick={handleTimeTableClick}
            className="cursor-pointer transition-all hover:opacity-80"
        >
            <h2 className="text-3xl font-bold mb-6">Time Table</h2>
            <div className="flex flex-col gap-4">
                {items && items.length > 0 ? (
                    items.map((slotItem, index) => (
                        <TimeSlot key={index} {...slotItem} />
                    ))
                ) : (
                    <div className="text-zinc-400">No time slots available</div>
                )}
            </div>
        </div>
    )
};

TimeTable.propTypes = {
    // Support both singular `slot` and plural `slots` prop names
    slot: PropTypes.arrayOf(PropTypes.shape({
        bgColor: PropTypes.string,
        time: PropTypes.string,
        subject: PropTypes.string,
        barColor: PropTypes.string
    })),
    slots: PropTypes.arrayOf(PropTypes.shape({
        bgColor: PropTypes.string,
        time: PropTypes.string,
        subject: PropTypes.string,
        barColor: PropTypes.string
    }))
}

export default TimeTable;