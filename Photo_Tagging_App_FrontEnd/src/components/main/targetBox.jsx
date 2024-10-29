function TargetBox({ x, y }) {
    const boxStyles = {
        position: 'absolute',
        width: 50,
        height: 50,
        border: '5px solid green',
        borderRadius: 30,
        boxShadow: '0 0 5px green',
        backgroundColor: '#59ee7031',

        top: y -25,
        left: x - 25
    }

    return(
        <div style={boxStyles}></div>
    )
}

export default TargetBox;