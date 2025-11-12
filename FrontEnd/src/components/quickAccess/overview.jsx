import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import OverviewItem from './overviewItem';

function Overview({ slots = {
  type: "-NA-",
  summary: "Error in fetching data",
  color: "bg-grey-400",
  subject: "Error"
} }){
    const today = new Date();
    const month = today.toLocaleString('default', { month: 'long' });
    const day = today.getDate();
    const navigate = useNavigate();
    
    function routingHandler(){
      navigate('/today');
    }
    
    return (
      <div className="flex flex-col sm:flex-row items-center gap-6">
      <div 
        onClick={routingHandler} 
        className="bg-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg buttonContainer cursor-pointer hover:opacity-80 transition-colors"
      >
        <div className="text-zinc-400 text-lg">{month}</div>
        <div className="text-7xl font-bold">{day}</div>
      </div>
      <div className="flex-1 w-full flex flex-col gap-3">
        {Array.isArray(slots) ? slots.map((slot, index) => (
        <OverviewItem 
          key={index}
          type={slot.type}
          summary={slot.summary}
          subject={slot.subject}
          color={slot.color}
        />
        )) : (
        <OverviewItem 
          type={slots.type}
          summary={slots.summary}
          subject={slots.subject}
          color={slots.color}
        />
        )}
      </div>
      </div>
    );
}

Overview.propTypes = {
  slots: PropTypes.oneOfType([
    // 1. The single object shape (for default/error)
    PropTypes.shape({
      type: PropTypes.string,
      summary: PropTypes.string,
      color: PropTypes.string,
      subject: PropTypes.string
    }),
    // 2. The array of shapes (for the list)
    PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
        summary: PropTypes.string,
        color: PropTypes.string,
        subject: PropTypes.string
      })
    )
  ])
}

export default Overview;