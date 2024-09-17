import { useState, useRef} from 'react';
import './App.css'
import crossIcon from "./assets/cross.png"
import circleIcon from "./assets/circle.png"

let squaresData = ["","","","","","","","",""];

function App() {


  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let [winnerImg, setWinnerImg] = useState("");
  const squares = useRef(new Array())

  function toggleImage(e, index, count){
    if(lock){
      e.preventDefault()
    } 
    else if (count%2===0){
      e.target.innerHTML = `<img src=${crossIcon} draggable="false"></img>`
      setCount(prev=>{
        prev++
        return prev
      })
      squaresData[index] = "x"
      checkWin("x")

    }
    else{
      e.target.innerHTML = `<img src=${circleIcon} draggable="false"></img>`
      setCount(prev=>{
        prev++
        return prev
      })
      squaresData[index] = "o"
      checkWin("o")
    }
  }

 function checkWin(winner){
  if(
    //Horizontal Check
     (squaresData[0] === squaresData[1] && squaresData[1] === squaresData[2] && squaresData[2] !=="") ||
     (squaresData[3] === squaresData[4] && squaresData[4] === squaresData[5] && squaresData[5] !=="") ||
     (squaresData[6] === squaresData[7] && squaresData[7] === squaresData[8] && squaresData[8] !=="") ||
    //Vertical Check
     (squaresData[0] === squaresData[3] && squaresData[3] === squaresData[6] && squaresData[6] !=="") ||
     (squaresData[1] === squaresData[4] && squaresData[4] === squaresData[7] && squaresData[7] !=="") ||
     (squaresData[2] === squaresData[5] && squaresData[5] === squaresData[8] && squaresData[8] !=="") ||
     //Cross Check
     (squaresData[0] === squaresData[4] && squaresData[4] === squaresData[8] && squaresData[8] !=="") ||
     (squaresData[2] === squaresData[4] && squaresData[4] === squaresData[6] && squaresData[6] !=="") 
  ){
    setLock(true);
    (winner ==="x")?
    setWinnerImg(crossIcon):
    setWinnerImg(circleIcon);
    console.log("Winner Winner Chicken Dinner!");
  }else{
    console.log("No Winner Yet");
  }
 }

 function handleReset(){
  setLock(false);
  squaresData = ["","","","","","","","",""];
  squares.current.map((square) =>{
    square.innerHTML="";
  })
 }


  return (
    <>
     <div className="container">
      {
        (!lock)?
        <h1>This is a TicTacToe game in    <span className= "headerReact">React</span></h1>
        :
        <h1>Congratulations! <img className="winner-icon" src={winnerImg}></img> won!</h1>
      } 
        <div className='playArea'>
          {squaresData.map((squareData, index) => {return <div className='square' key={index} ref={(squareData) => squares.current[index] = squareData} onClick={(event) => toggleImage(event, index, count)}></div>})}
        </div>
        <button onClick={handleReset}>
          Reset
        </button>
      </div>
    </>
  )
}

export default App
