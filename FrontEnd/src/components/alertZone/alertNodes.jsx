import PropTypes from "prop-types";

function AlertNodes(props){
    return (
        <div className="bg-zinc-800 rounded-lg p-4 flex justify-between items-center shadow-lg">
            <div className="text-md font-medium text-white">{props.title}</div>
            <div className="text-sm text-zinc-400">{props.date}</div>
        </div>
    )
}

AlertNodes.propTypes = {
    title: PropTypes.string,
    date: PropTypes.string
}

export default AlertNodes;