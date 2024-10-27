import { useState } from "react";

function ImageComponent () {
    const [ mouseX, setMouseX ] = useState(null);
    const [ mouseY, setMouseY ] = useState(null);
    const [ ddHidden, setDdHidden ] = useState(true);
    const [ charPick, setCharPick] = useState(null);

    const imagesStyles = {
        width: "500px",
        height: "300px",
        position: "relative"
    }

    const dropdownStyles = {
        position: "absolute",
        left: mouseX + 5,
        top: mouseY - 15
    }
    
    const handleClick = (e) => {
        if (ddHidden){
            const bounds = e.target.getBoundingClientRect();
            const x = e.clientX - bounds.left;
            const y = e.clientY - bounds.top;
            setMouseX(parseInt(x));
            setMouseY(parseInt(y));
            setDdHidden(false);
        }
    }

    const handleSelect = (e) => {
        setDdHidden(true);
        setCharPick(e.target.value);
        // fetch => post
         // x, y, char
    }

    return (
        <div className="image" onClick={handleClick} style={imagesStyles}>
            {mouseX} {mouseY} {charPick}
            <div hidden={ddHidden} style={dropdownStyles}>
                <select name="character" id="char" onChange={handleSelect}>
                    <option value="char1">Char 1</option>
                    <option value="char2">Char 2</option>
                    <option value="char3">Char 3</option>
                </select>
            </div>
        </div>
    )
}

export default ImageComponent;