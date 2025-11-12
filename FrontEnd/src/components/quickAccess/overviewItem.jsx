import PropTypes from 'prop-types';


function OverviewItem({ 
    type = "-NA-",
    summary = "Error in fetching data",
    color = "bg-grey-400",
    subject = "Error"
}){
    return (
        <div className="bg-zinc-800 rounded-lg p-4 flex justify-between items-center shadow-lg">
        <span className="font-semibold">{`${type}: ${summary}`}</span>
        <span className={`${color} text-black text-xs font-bold px-2 py-1 rounded-full`}>{subject}</span>
        </div>
    )
};

OverviewItem.propTypes = {
    type: PropTypes.string,
    summary: PropTypes.string,
    color: PropTypes.string,
    subject: PropTypes.string
}

export default OverviewItem;