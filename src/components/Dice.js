import React from "react"

function Pip(){
    return(
         <span className="pip"></span>
    )
}


export default function Dice(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    const pips = [];
    for (let i = 0; i < props.value; i++) {
        pips.push(<Pip key={i} />);
    }


    return (
        <div 
            className="dice-face" 
            style={styles}
            onClick={props.holdDice}
        >   
            {pips}
        </div>
    )
}