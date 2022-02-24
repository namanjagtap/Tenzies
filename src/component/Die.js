import React from "react"

export default function Die(props){
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return(
        <div
            className="dice-face"
            style={styles}
            onClick={() => props.holdDice(props.id)}
        >
            <h1>{props.value}</h1>
        </div>
    )
}