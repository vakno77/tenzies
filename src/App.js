import React from "react"
import Dice from "./components/Dice"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [rolls, setRolls] = React.useState(0)
    const [time, setTime] = React.useState(0);
    const [isRunning, setIsRunning] = React.useState(false);
    const intervalRef = React.useRef(null);
    const [isStop, setIsStop] = React.useState(false);

    if (tenzies && !isStop) {
      stop();
      setIsStop(true);
    }

    function start(){
      if (!isRunning) {
        setIsRunning(true);
        const startTime = Date.now() - time;
        intervalRef.current = setInterval(() => {
          setTime(Date.now() - startTime);
        }, 51);
      } 
    };

    function stop(){
        clearInterval(intervalRef.current);
        setIsRunning(false);
    }

    function reset(){
      clearInterval(intervalRef.current);
      setTime(0);
      setIsRunning(false);
      setIsStop(false);
    };
  
    function formatTime(milliseconds){
      const mm = Math.floor(milliseconds / 60000);
      const ss = Math.floor((milliseconds % 60000) / 1000);
      const ms = (milliseconds % 1000 / 10).toFixed(0);
      return `${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}:${ms.toString().padStart(2, '0')}`;
    };

    
    React.useEffect(() => {
        const allHeld = dice.every(dice => dice.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(dice => dice.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])

    function generateNewDice() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDice())
        }
        return newDice
    }
    
    
    function rollDice() {
        start()
        if(!tenzies) {
            setRolls((prevRolls)=>prevRolls + 1)
            setDice(oldDice => oldDice.map(dice => {
                return dice.isHeld ? 
                    dice :
                    generateNewDice()
            }))
        } else {
            reset()
            setRolls(0)
            setTenzies(false)
            setDice(allNewDice())
        }
    }
    
    function holdDice(id) {
        start()
        setDice(oldDice => oldDice.map(dice => {
            return dice.id === id ? 
                {...dice, isHeld: !dice.isHeld} :
                dice
        }))
    }
    
    const diceElements = dice.map(dice => (
        <Dice 
            key={dice.id} 
            value={dice.value} 
            isHeld={dice.isHeld} 
            holdDice={() => holdDice(dice.id)}
        />
    ))
    
    return (
        <main>
            {tenzies && <Confetti />}
            <div className="absolute-wrapper">
                <div className="container">
                    <h1 className="title">Tenzies</h1>
                    <p className="instructions">Roll until all dice are the same. 
                    Click each dice to freeze it at its current value between rolls.</p>
                    <div className="dice-container">
                        {diceElements}
                    </div>
                    <div>Rolls: {rolls} </div>
                    <button 
                        className="roll-dice" 
                        onClick={rollDice}
                    >
                        {tenzies ? "New Game" : "Roll"}
                    </button>
                    <div id="timer">{formatTime(time)}</div>                </div>
            </div>
        </main>
    )
}