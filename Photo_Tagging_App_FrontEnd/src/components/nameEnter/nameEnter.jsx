import { useState } from "react";

function NameEnter({ time, imageId }) {
    const [ name, setName ] = useState('');
    const [ disabled, setDisabled ] = useState(false);

    const inputStyle = {
        padding: '0.5rem',
        fontSize: '18px',
        borderRadius: '5px',
        textAlign: 'center'
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisabled(true);
        // fetch post score and name
        fetch(`http://localhost:3000/score`, {
            method: 'post',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                imageId: imageId,
                playerName: name,
                time: time
            }),
        })
        .then(res => res.json())
        .then(data => {
            window.location.reload();
            console.log(data.message)
        })
        .catch(err => console.log(err.message));
    }

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <input  type="text" 
                        value={name} 
                        placeholder="Your Name" 
                        onChange={(e) => setName(e.target.value)}
                        style={inputStyle}/>
                <button disabled={disabled}>Submit Score</button>
            </form>
        </div>
    )
}

export default NameEnter;