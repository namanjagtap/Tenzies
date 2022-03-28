import React, {useEffect, useState} from "react"
import Die from "./component/Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App(){

  const [dice,setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

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
  
  // function holdDice(id){
  //   setDice(prevDice => {
  //     const newArray = []
  //     for(let i = 0; i< prevDice.length; i++){
  //       const currentDice = prevDice[i]
  //       if(currentDice.id === id){
  //         const updatedDice = {
  //           ...currentDice,
  //           isHeld: !currentDice.isHeld
  //         }
  //         newArray.push(updatedDice)
  //       }
  //       else{
  //         newArray.push(currentDice)
  //       }
  //     }
  //     return newArray
  //   })
  // }

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
    }
    else{
      setTenzies(false)
      setDice(allNewDice)
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

  return(
    <main>
      {tenzies && <Confetti />}
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
    </main>
  )
}