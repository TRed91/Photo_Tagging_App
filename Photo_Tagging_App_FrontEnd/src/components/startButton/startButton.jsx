function StartButton({start, image}){

    const buttonStyles = {
        margin: 5
    }

    return(
        <div style={buttonStyles}>
            {image 
                ? <button onClick={start}>Start</button> 
                : <button>Loading...</button>} 
        </div>
    )
}

export default StartButton;