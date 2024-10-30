import { useState } from "react"
import ScoreBoard from "../main/scoreBoard"

function Header({ imageId }){
    const [ scoreBoard, setScoreBoard ] = useState(false)

    const scoreBoardLinkStyles = {
        position: 'relative'
    }

    const heroStyle = {
        fontStyle: 'italic',
        background: '-webkit-linear-gradient(rgba(238,174,202,1) 0%, rgba(148,223,233,1) 100%)',
        webkitBackgroundClip: 'text',
        webkitTextFillColor: 'transparent',
        textShadow: '0 0 4px lightBlue'
    }

    const linkStyle = {
        cursor: 'pointer'
    }

    return (
        <header>
            <div><h1 style={heroStyle}>Tagging App</h1></div>
            <div style={scoreBoardLinkStyles}>
                <a onClick={() => scoreBoard? setScoreBoard(false) : setScoreBoard(true)} style={linkStyle}>Score Board</a>
                {scoreBoard && <ScoreBoard imageId={imageId} />}
            </div>
        </header>
    )
}

export default Header