
import Confetti from "react-confetti"
import './App.css'
import Dice from './components/Dice'
import { useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';

function App() {

  const [diceValues, setDiceValues] = useState(()=>generateAllNewDice())

  const buttonRef = useRef(null)

  function generateAllNewDice() {
    return new Array(10)
        .fill({})
        .map(() => {
          return{
            number: Math.ceil(Math.random() * 6),
            isHold: false,
            id: nanoid()
          }
        })
  }

  const diceElements = diceValues.map((value)=>{
    return <Dice key={value.id} id={value.id} value={value.number} isHold={value.isHold} holdDice={toggleDice}/>
  })

  function rollDice(){
    gameWon?setDiceValues(()=>generateAllNewDice()):
    setDiceValues(prev=>
      prev.map((item) => {
        return{
          ...item,
          number: item.isHold?item.number:Math.ceil(Math.random() * 6)
        }
      })
    )
  }

  function toggleDice(id){
    setDiceValues(prev=>
      prev.map((item) => {
        return{
          ...item,
          isHold: item.id===id?!item.isHold:item.isHold
        }
      })
    )
  }

  const gameWon = diceValues.every(die => die.isHold) &&
                  diceValues.every(die => die.number === diceValues[0].number)

  useEffect(() => {
    if (gameWon) {
        buttonRef.current.focus()
    }
  }, [gameWon])

  return (
    <main>
      {gameWon && <Confetti />}
       <h1 className="title">Tenzies</h1>
       <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {diceElements}
      </div>

      <button ref={buttonRef} className="roll-dice" onClick={rollDice}> {gameWon ? "New Game" : "Roll"}</button>
    </main>
  )
}

export default App
