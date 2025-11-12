import PropTypes from "prop-types";
import ToDoNode from "./toDoNode";

function ToDo({ slots = [
    {
        category: "Error",
        description: "Error in Fetching data",
        tag: "--NA--"
    }
] }){
    console.log(slots);
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-zinc-400">Today's Do List</h2>
            <div className="flex flex-col gap-4">
              {slots.map((item, index) => (
                <ToDoNode key={index} {...item} />
              ))}
            </div>
          </div>
    );
}

ToDo.propTypes = {
    slots: PropTypes.arrayOf(PropTypes.shape({
            category: PropTypes.string,
            description: PropTypes.string,
            tag: PropTypes.string,
        }))
}

export default ToDo;