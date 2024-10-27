function StartButton({start}){

    const buttonStyles = {
        margin: 5
    }

    return(
        <div style={buttonStyles}>
            <button onClick={start}>Start</button>
        </div>
    )
}

export default StartButton;