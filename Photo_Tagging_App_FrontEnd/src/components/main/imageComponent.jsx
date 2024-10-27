import { useEffect, useRef, useState } from "react";
import StartButton from "../startButton/startButton";

function ImageComponent () {
    const ref = useRef(null);
    const [ mouseX, setMouseX ] = useState(null);
    const [ mouseY, setMouseY ] = useState(null);
    const [ ddHidden, setDdHidden ] = useState(true);
    const [ charPick, setCharPick] = useState(null);
    const [ result, setResult ] = useState(null);
    const [ found, setFound ] = useState(0);
    const [ gameStart, setGameStart] = useState(false);
    const [ gameEnd, setGameEnd ] = useState(false);

    const imagesStyles = {
        width: "800px",
        height: "500px",
        position: "relative"
    }

    const dropdownContainerStyles = {
        position: "absolute",
        left: mouseX + 5,
        top: mouseY - 15,
        zIndex: 10,
    }

    const dropdownStyles = {
        padding: 10
    }

    useEffect(() => {
        const handleOutSideClick = (e) => {
            if (!ref.current?.contains(e.target)) {
                setDdHidden(true);
            }
        };
        window.addEventListener("mousedown", handleOutSideClick);
        return () => {
            window.removeEventListener("mousedown", handleOutSideClick);
        }

    }, [ref])
    
    const handleClick = (e) => {
        if (gameStart && ddHidden && !gameEnd)
        {
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
        // fetch => get
         // x, y, char
        // mock result
        setResult({result: 'correct', time: '42:16:33'});
        setFound(found + 1);
        if (found + 1 == 3) {
            setGameEnd(true);
        }
    }

    return (
        <div>
            {!gameStart && <div><StartButton start={() => setGameStart(true)} /></div>}
            <div className="image" onClick={handleClick} style={imagesStyles}>
                {mouseX} {mouseY} {charPick}
                <div hidden={ddHidden} style={dropdownContainerStyles} ref={ref}>
                    <select name="character" id="char" onChange={handleSelect} style={dropdownStyles}>
                        <option value="char1">Char 1</option>
                        <option value="char2">Char 2</option>
                        <option value="char3">Char 3</option>
                    </select>
                </div>
                {gameEnd && <div>
                    <h1>You win!</h1>
                    <h2>Time: {result.time}</h2>
                    </div>}
            </div>
            <div className="resultContainer">
                <p>Found: {found}/3 {result && result.result}</p>
            </div>
        </div>
    )
}

export default ImageComponent;