import { useEffect, useState } from "react";

function ScoreBoard ({ imageId }) {
    const [ scores, setScores ] = useState([])

    const boardContainerStyles = {
        position: 'absolute',
        border: '2px solid black',
        padding: 20,
        background: 'linear-gradient(0deg, rgba(255,254,229,1) 0%, rgba(255,255,255,1) 50%, rgba(255,242,101,1) 100%)',
        color: 'black',
        borderRadius: 5,
        boxShadow: '0 0 3px white',
        width: '30vw',

        right: 0,
        top: '2rem',

        zIndex: 10
    }

    const listStyle = {
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        allignItems: 'center'
    }

    const listElementStyles = {
        display: 'flex',
        listStyle: 'none',
        fontSize: 20,
    }

    const spanStyles = {
        flex: '0 0 33%',
        textAlign: 'center'
    }

    const headerSpanStyles = {
        flex: '0 0 33%',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 5
    }

    useEffect(() => {
        fetch(`http://localhost:3000/score?imageId=${imageId}`, {
            method: 'get',
        })
        .then(res => res.json())
        .then(data => setScores(data.data))
    }, [])

    return (
        <div style={boardContainerStyles}>
            <ul style={listStyle}>
                <li style={listElementStyles}>
                    <span style={headerSpanStyles}>Player</span>
                    <span style={headerSpanStyles}></span>
                    <span style={headerSpanStyles}>Time</span>
                </li>
                {scores.length > 1 && scores.map(s => {
                    const time = new Date(s.score);
                    return <li key={s.scoreId} style={listElementStyles}>
                        <span style={spanStyles}>{s.playerName}</span> 
                        <span style={spanStyles}>-</span> 
                        <span style={spanStyles}>{time.getMinutes()}:{time.getSeconds()}:{time.getMilliseconds()}</span>
                        </li>
                })}
            </ul>
        </div>
    )
}

export default ScoreBoard;