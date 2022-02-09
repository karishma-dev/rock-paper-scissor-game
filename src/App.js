// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const easyArr = ["paper", "scissor", "rock"];
const hardArr = ["paper", "scissor", "rock", "lizard", "spock"];
const imgArr = ["images/icon-paper.svg", "images/icon-scissors.svg","images/icon-rock.svg", "images/icon-lizard.svg", "images/icon-spock.svg"];
const easyObj = {
  "paper": "images/icon-paper.svg",
  "scissor": "images/icon-scissors.svg",
  "rock": "images/icon-rock.svg"
}
const hardObj = {
  "scissor": "images/icon-scissors.svg",
  "paper": "images/icon-paper.svg",
  "rock": "images/icon-rock.svg",
  "lizard": "images/icon-lizard.svg",
  "spock" : "images/icon-spock.svg"
}
function App() {
  const [display, setDisplay] = useState(easyObj);
  const [score, setScore] = useState(0); 
  const [status, setStatus] = useState();
  const [result, setResult] = useState(false);
  const [easy, setEasy] = useState(true);

  const random = () => {
    let arr;
    if(easy){
      arr= easyArr;
    }else{
      arr=hardArr;
    }
    let len = arr.length;
    let randomIndex = Math.floor(Math.random() * len);
    return arr[randomIndex];
  }
  function showResult(key,i){
    setResult(true);
    switch(random()){
      case "paper":
        if(key === "paper"){
          key = "paper1";
        }
        setDisplay({ 
          [key]: i, 
          "paper": imgArr[0]
        });

        if(key === "scissor" || key === "scissor1" || key === "lizard" || key === "lizard1"){
          setStatus("You Won!");
          setScore(prev => prev + 1);
        }else if(key === "rock" || key === "rock1" || key === "spock" || key === "spock1"){
          setScore(prev => prev - 1);
          setStatus("You lose!");
        }else{
          setStatus("Draw");
        }

        break;

      case "scissor":
        if(key === "scissor"){
          key = "scissor1";
        }
       
        setDisplay({ 
          [key]: i,
          "scissor": imgArr[1]
        });

        if(key === "rock" || key === "rock1" || key === "spock" || key === "spock1"){
          setStatus("You Won!");
          setScore(prev => prev + 1);
        }else if(key === "paper" || key === "paper1" || key === "lizard" || key === "lizard1"){
          setScore(prev => prev - 1);
          setStatus("You lose!")
        }else{
          setStatus("Draw");
        }
        break;
      
      case "rock":
        if(key === "rock"){
          key = "rock1";
        } 

        setDisplay({ 
          [key] : i, 
          "rock": imgArr[2]
        });

        if(key === "paper" || key === "paper1" || key === "spock" || key === "spock1"){
          setStatus("You Won!");
          setScore(prev => prev + 1);
        }else if(key === "scissor" || key === "scissor1" || key === "lizard" || key === "lizard1"){
          setScore(prev => prev - 1);
          setStatus("You lose!")
        }else{
          setStatus("Draw");
        }
        break;

        case "lizard": 
          if(key === "lizard"){
            key = "lizard1";
          } 

          setDisplay({ 
            [key] : i, 
            "lizard": imgArr[3]
          });

          if(key === "rock" || key === "rock1" || key === "scissor" || key === "scissor1"){
            setStatus("You Won!");
            setScore(prev => prev + 1);
          }else if(key === "spock" || key === "spock1" || key === "paper" || key === "paper1"){
            setScore(prev => prev - 1);
            setStatus("You lose!")
          }else{
            setStatus("Draw");
          }
          break;

          case "spock":
            if(key === "spock"){
              key = "spock1";
            } 
    
            setDisplay({ 
              [key] : i, 
              "spock": imgArr[2]
            });
    
            if(key === "lizard" || key === "lizard1" || key === "paper" || key === "paper1"){
              setStatus("You Won!");
              setScore(prev => prev + 1);
            }else if(key === "scissor" || key === "scissor1" || key === "rock" || key === "rock1"){
              setScore(prev => prev - 1);
              setStatus("You lose!")
            }else{
              setStatus("Draw");
            }
            break;

            default:
              alert("Error");
              break;

    }
  }
  const showRules = (e) => {
    let modal = document.getElementById("myModal");
    if(e === "r"){
      modal.style.display = "block";
    }else{
      modal.style.display = "none";
    }
  }

  window.onclick = function(event) {
    let modal = document.getElementById("myModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  }

  const replay = () => {
    if(easy){
      setDisplay(easyObj);
    }else{
      setDisplay(hardObj);
    }
    setStatus();
    setResult(false);
  }

  const changeGame = () => {
    let c = document.getElementById("check");
    if(c.checked === true){
      setDisplay(hardObj);
      setEasy(false);
      setScore(0);
    }else{
      setDisplay(easyObj);
      setEasy(true);
      setScore(0);
    }
  }

  return (
    <div className="App">
      <div className='name-score'>
        <div id='name'> 
            <img src={easy ?  "images/logo.svg" : "images/logo-bonus.svg" } alt = "Rock Paper Scissors" id="logo"/>
        </div>
        <div className='score'>
          <span id='score-text'>Score</span>
          <span id='score'>{score}</span>
        </div>
      </div>

      <div id = "switch-container">
        Easy
        <label className='switch'>
          <input id = "check" type= "checkbox" onClick = {changeGame}></input>
          <span className='slider'></span>
        </label>
        Hard
      </div>
      {
        result ? 
        <Result display = {display} status = {status} replay = {replay}/> :       
        <div className= {easy ? 'easybtn-container' : 'hardbtn-container'}>
          <Buttons display = {display} result = {showResult}/> 
        </div>
      }

      <button id  = "rules" onClick={() => showRules("r")}>RULES</button>
      
      {/* <!-- The Modal --> */}
      <div id="myModal" className="modal">

        {/* <!-- Modal content --> */}
        <div className="modal-content">
          <div id='modal-title'>
            <span>RULES</span>
            <span className="close" onClick={() => showRules("c")}>&times;</span>
          </div>
          <div>
            <img src={easy ? 'images/image-rules.svg' : "images/image-rules-bonus.svg"}></img>
          </div>
        </div>

      </div>
      
    </div>
  );
}

const Buttons = ({display, result}) => {
  let array = [];
  for (const key in display) {
      let element = (
        <>
          <button id = {key} value = {key} className = "button" onClick = {() => result(key, display[key])}>
            <img src= {display[key]} />
          </button>
        </>
      );
      array.push(element);
  }
  return array;
}

const Result = ({display, status, replay}) => {
  let key = [Object.keys(display)[0],Object.keys(display)[1] ];
  if(status === "You lose!"){
    document.documentElement.style.setProperty("--status-text", "red");
  }
  return (
    <div className='result-container'>
      <div className='btn'>
        <span className='btn-title'>You Picked</span>
        <button id={key[0]} className = "button">
          <img src= {display[key[0]]}></img>
        </button>
      </div>
      <div id='status'>
        <span>
          {status}
        </span>
        <button id='play-again' onClick={replay}>Play Again</button>
      </div>
      <div className='btn'>
        <span className='btn-title'>The House Picked</span>
        <button id={key[1]} className = "button">
          <img src= {display[key[1]]}></img>
        </button>
      </div>
    </div>
  )
}

export default App;