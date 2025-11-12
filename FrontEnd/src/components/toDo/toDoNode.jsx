import PropTypes from "prop-types";
import { useState } from "react";

function ToDoNode({ 
    category = "Error",
    description = "Error in Fetching data",
    tag = "--NA--"
}){
    const [bgColor, setBgColor] = useState("bg-red-400");
    const [colorTurn, setTurn] = useState(0);

    function changeBg(){
        setTurn((colorTurn + 1) % 3);

        if(colorTurn == 0) setBgColor("bg-red-400");
        if(colorTurn == 1) setBgColor("bg-orange-400");
        if(colorTurn == 2) setBgColor("bg-green-400");
    }
    
    return (
        <div onClick={changeBg} className={`${bgColor} rounded-lg p-4 flex justify-between items-center text-white shadow-lg`}>
            <div>
                <div className="font-bold text-lg">{category}</div>
                <div className="text-sm text-zinc-200">{description}</div>
            </div>
            <div className="font-semibold">{tag}</div>
        </div>
    );
}

ToDoNode.propTypes = {
    category: PropTypes.string,
    description: PropTypes.string,
    tag: PropTypes.string,
}

export default ToDoNode;
