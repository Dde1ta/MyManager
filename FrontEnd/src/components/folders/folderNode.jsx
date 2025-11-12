import PropTypes from "prop-types";

function FolderNode({ 
  name = "Error In Fetching Name", 
  color = "red",
  onClick
}) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-zinc-800 rounded-lg p-5 shadow-lg flex flex-col justify-end h-32
        cursor-pointer transition-transform hover:scale-105
        border-b-4 border-${color}-500
    `}
    >
      <span className="text-white font-semibold text-xl leading-snug">
        {name}
      </span>
    </div>
  );
}

FolderNode.propTypes = {
  name: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

export default FolderNode;
