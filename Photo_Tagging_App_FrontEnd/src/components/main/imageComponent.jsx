import { useEffect, useRef, useState } from "react";
import StartButton from "../startButton/startButton";
import NameEnter from "../nameEnter/nameEnter";
import TargetBox from "./targetBox";

function ImageComponent ({ imageId }) {
    const ref = useRef(null);
    const [ mouseX, setMouseX ] = useState(null);
    const [ mouseY, setMouseY ] = useState(null);
    const [ ddHidden, setDdHidden ] = useState(true);
    const [ result, setResult ] = useState(null);
    const [ found, setFound ] = useState(0);
    const [ gameStart, setGameStart] = useState(false);
    const [ gameEnd, setGameEnd ] = useState(false);
    const [ image, setImage ] = useState(null);
    const [ imageData, setImageData ] = useState(null);
    const [ timeId, setTimeId ] = useState(null);
    const [ time, setTime ] = useState(null);
    const [ boxes, setBoxes ] = useState([]);

    const imagesStyles = {
        width: "1280px",
        height: "720px",
        position: "relative",
        background: image ? `url(${image})` : 'black'
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

    const correctStyle = {
        color: 'green'
    }

    const wrongStyle = {
        color: 'red'
    }

    const resultStyles = {
        fontWeight: 'bold'
    }

    useEffect(() => {
        fetch(`http://localhost:3000/image/${imageId}`, {
            method: 'get'
        })
        .then(res => res.blob())
        .then(blob => { 
            const url = URL.createObjectURL(blob);
            setImage(url);
        })
        .catch(err => console.log(err));

        fetch(`http://localhost:3000/image/${imageId}/data`, {
            method: 'get'
        })
        .then(res => res.json())
        .then(data => {
            setImageData(data.data);
        })
        .catch(err => console.log(err))
    }, [])

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
        fetch(`http://localhost:3000/image/1/position?select=${e.target.value}&xPos=${mouseX}&yPos=${mouseY}`, {
            method: 'get',
        })
        .then(res => res.json())
        .then(data => {
            if (data.result == 'success') {
                setFound(found + 1);
                setBoxes((boxes) => [...boxes, {x: mouseX, y: mouseY}]);
                if (found + 1 >= imageData.positions.length) {
                    postTime()
                } else {
                    setResult({result: 'correct', time: ''});
                }
            } else {
                setResult({result: 'wrong', time: ''});
            }
        })
        .catch(err => console.log(err));
    }

    const postTime = () => {
        fetch(`http://localhost:3000/timer`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                timeId: timeId
            }),
        })
        .then(res => res.json())
        .then(data => {
            const result = new Date(data.time);
            const time = `${result.getMinutes()}:${result.getSeconds()}:${result.getMilliseconds()}`
            setTime(data.time);
            setResult({ result: 'correct', time: time });
            setGameEnd(true);
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            {!gameStart && <div><StartButton start={() => setGameStart(true)} 
                                             setTimerId={(id) => setTimeId(id)} 
                                             image={image} />
                            </div>}
            <div className="image" onClick={handleClick} style={imagesStyles}>
                {!image && 'Loading...'}
                {!ddHidden && <div style={dropdownContainerStyles} ref={ref}>
                    <select name="character" id="char" onChange={handleSelect} style={dropdownStyles}>
                        <option value="">--choose--</option>
                        {imageData.positions.map(e => {
                            const name = e.character.charName;
                            return <option value={name} key={name}>{name}</option>
                        })}
                    </select>
                </div>}
                {gameEnd && <div className="game-end-text">
                    <h1>You win!</h1>
                    <h2>Time: {result.time}</h2>
                    <NameEnter time={time} imageId={imageId} />
                    </div>}
                {boxes.map(box => {
                    return <TargetBox x={box.x} y={box.y} key={box.x + box.y}/>
                })}
            </div>
            <div className="resultContainer">
                <p style={resultStyles}>Found: {found}/3 {result && 
                    <span style={result.result == 'correct' ? correctStyle : wrongStyle}>{result.result}</span>}
                </p>
            </div>
        </div>
    )
}

export default ImageComponent;