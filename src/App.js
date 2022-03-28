import React, {useEffect, useState} from "react"
import Die from "./component/Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App(){

  const [dice,setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(true)
  const [count, setCount] = useState(0)
  const [bestScore, setBestScore] = useState(
    () => JSON.parse(localStorage.getItem("score")) || 999
  )

  useEffect(() => {
    if(tenzies && (count<bestScore)){
      setBestScore(() => {
            localStorage.setItem("score", JSON.stringify(count))
      })
    }
    console.log(bestScore)
  }, [tenzies])

  
  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if(allHeld && allSameValue){
      setTenzies(true)
      console.log("You won!!")
    }
  }, [dice])
  
  function allNewDice(){
    const newArray = []
    for(let i=0;i<10;i++){
      newArray.push(generateDice())
    }
    return newArray
  }

  function generateDice(){
    return({
      value: Math.floor(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    })
  }

  function holdDice(id){
    setDice(prevDice => prevDice.map( die => {
        return (die.id === id) ? {...die, isHeld: !die.isHeld} : die
      }
    ))
  }
        
  function rollDice(){
    if(!tenzies){
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? die : generateDice()
      }))
      setCount(prevCount => prevCount+1)
    }
    else{
      // console.log(count)
      // if(count<highScore){
      //   localStorage.setItem("highScore", JSON.stringify(count))
      // }
      setTenzies(false)
      setDice(allNewDice)
      setCount(0)
    }
  }
  
  const dieElements = dice.map(die => (
    <Die
      key={die.id}
      id={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={holdDice}
    />
  ))

  const refreshPage = () => {
    window.location.reload();
  }

  return(
    <main>
      {
        !tenzies ?
          <div className="main-component">
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container" >
              {dieElements}
            </div>
            <button
              className="roll-dice"
              onClick={rollDice}
              >
              {tenzies ? "New Game" : "Roll Dice"}
            </button>
            <div className="score">
              <h4 className="your-score">Score: {count}</h4>
              <h4>Best Score: {bestScore===999 ? 0 : JSON.parse(localStorage.getItem("score"))}</h4>
            </div>
          </div>
        :
        <div className="main-component">
          {tenzies && <Confetti />}
          <h1 className="title" >Congratulations!</h1>
          <h1 className="title" >You Won!!</h1>
          {/* <h1>Best Score: {bestScore === 999 ? 0 : bestScore}</h1> */}
          <div className="score">
            <h3 className="your-score">Best Score: {JSON.parse(localStorage.getItem("score"))}</h3>
            <h3>Your Score: {count}</h3>
          </div>
          <button
              className="roll-dice"
              onClick={() => {rollDice(); refreshPage()}}
              // onClick={refreshPage}
            >
              {tenzies ? "New Game" : "Roll Dice"}
            </button>
        </div>
        }
    </main>
  )
}