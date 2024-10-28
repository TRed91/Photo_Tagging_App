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
    const [ image, setImage ] = useState(null);
    const [ imageData, setImageData ] = useState(null);

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

    useEffect(() => {
        fetch('http://localhost:3000/image/1', {
            method: 'get'
        })
        .then(res => res.blob())
        .then(blob => { 
            const url = URL.createObjectURL(blob);
            setImage(url);
        })
        .catch(err => console.log(err));

        fetch('http://localhost:3000/image/1/data', {
            method: 'get'
        })
        .then(res => res.json())
        .then(data => {
            setImageData(data.data)
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
        setCharPick(e.target.value);
        fetch(`http://localhost:3000/image/1/position?select=${e.target.value}&xPos=${mouseX}&yPos=${mouseY}`, {
            method: 'get',
        })
        .then(res => res.json())
        .then(data => {
            if (data.result == 'success') {
                setFound(found + 1);
                if (found + 1 >= imageData.positions.length) {
                    setResult({result: 'correct', time: '42:16:33'});
                    setGameEnd(true);
                } else {
                    setResult({result: 'correct', time: ''});
                }
            } else {
                setResult({result: 'wrong', time: ''});
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <div>
            {!gameStart && <div><StartButton start={() => setGameStart(true)} image={image} /></div>}
            <div className="image" onClick={handleClick} style={imagesStyles}>
                {!image && 'Loading...'}
                {imageData && <div hidden={ddHidden} style={dropdownContainerStyles} ref={ref}>
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
                    </div>}
            </div>
            <div className="resultContainer">
                <p>Found: {found}/3 {result && result.result}</p>
            </div>
        </div>
    )
}

export default ImageComponent;