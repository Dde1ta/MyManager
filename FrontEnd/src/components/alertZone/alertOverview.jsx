import PropTypes from "prop-types";
import AlertNodes from "./alertNodes";
import { useNavigate } from 'react-router-dom';

function AlertOverview({ slots = [
    {
        title: "Error",
        date: "--NA--"
    }
] }){
    const navigate = useNavigate();

    const handleNavigateToAlerts = () => {
        navigate('/alerts');
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Alerts</h2>
                <button 
                    onClick={handleNavigateToAlerts}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    View All Alerts
                </button>
            </div>
            <div className="flex flex-col gap-4">
              {slots.map((alert, index) => (
                <AlertNodes key={index} {...alert} />
              ))}
            </div>
        </div>
    )
}

AlertOverview.propTypes = {
     slots: PropTypes.arrayOf(
                PropTypes.shape({
                    title: PropTypes.string,
                    date: PropTypes.string
                })
            )
}

export default AlertOverview;