import PropTypes from 'prop-types';

const TimeSlot = ({ 
    bgColor = "bg-orange-500", 
    time = "Error In Getting Time", 
    barColor = "bg-red-500", 
    subject = "Error In Getting Subject" 
}) => {
    return (
    <div className={`flex ${bgColor} rounded-lg overflow-hidden shadow-lg`}>
        <div className="flex-1 p-5">
        <div className="text-sm text-zinc-400">{time}</div>
        <div className="text-xl font-bold text-white mt-1">{subject}</div>
        </div>
        <div className={`w-10 ${barColor}`}></div>
    </div>
    )
};

TimeSlot.propTypes = {
    bgColor: PropTypes.string,
    time: PropTypes.string,
    subject: PropTypes.string,
    barColor: PropTypes.string
}

export default TimeSlot;