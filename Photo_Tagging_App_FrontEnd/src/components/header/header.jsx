import { useState } from "react"
import ScoreBoard from "../main/scoreBoard"

function Header({ imageId }){
    const [ scoreBoard, setScoreBoard ] = useState(false)

    const scoreBoardLinkStyles = {
        position: 'relative'
    }

    return (
        <header>
            <div><h1>Tagging App</h1></div>
            <div style={scoreBoardLinkStyles}>
                <a onClick={() => scoreBoard? setScoreBoard(false) : setScoreBoard(true)}>Score Board</a>
                {scoreBoard && <ScoreBoard imageId={imageId} />}
            </div>
        </header>
    )
}

export default Header