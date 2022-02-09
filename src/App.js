// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Buttons from './Buttons';
import Result from './Result';

// Objects and Arrays
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

// App
export default function App() {

  // States
  const [display, setDisplay] = useState(easyObj);
  const [score, setScore] = useState(0); 
  const [status, setStatus] = useState();
  const [result, setResult] = useState(false);
  const [easy, setEasy] = useState(true);

  // Function to return a random element from array
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

  // Function to decide Result
  function checkResult(key,i){
    setResult(true);

    // Switch statement to decide who won or lost
    switch(random()){

      // The house picked paper
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

      // The house picked scissor
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
      
      // The house picked rock
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

      // The house picked lizard
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

      // The house picked spock
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

      // Default case
      default:
        alert("Error");
        break;
    }

  }

  // Function to show rules
  const showRules = (e) => {
    let modal = document.getElementById("myModal");
    if(e === "r"){
      modal.style.display = "block";
    }else{
      modal.style.display = "none";
    }
  }

  // Function to close modal if user touches anywhere on screen
  window.onclick = function(event) {
    let modal = document.getElementById("myModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  }

  // Function to replay game
  const replay = () => {
    if(easy){
      setDisplay(easyObj);
    }else{
      setDisplay(hardObj);
    }
    setStatus();
    setResult(false);
  }

  // Function to change game from easy to hard and vice-versa
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
    // App
    <div className="App">

      {/* Container containing name and score */}
      <div className='name-score'>

         {/* Name */}
        <div id='name'> 
            <img src={easy ?  "images/logo.svg" : "images/logo-bonus.svg" } alt = {easy ? "Rock Paper Scissors" : "Rock Paper Scissors Lizard Spock"} id="logo"/>
        </div>

        {/* Score */}
        <div className='score'>
          <span id='score-text'>Score</span>
          <span id='score'>{score}</span>
        </div>
      </div>

      {/* Container containing switch */}
      <div id = "switch-container">
        Easy
        <label className='switch'>
          <input id = "check" type= "checkbox" onClick = {changeGame}></input>
          <span className='slider'></span>
        </label>
        Hard
      </div>

      {/* Buttons */}
      {
        result ? 
        <Result display = {display} status = {status} replay = {replay}/> :       
        <div className= {easy ? 'easybtn-container' : 'hardbtn-container'}>
          <Buttons display = {display} result = {checkResult}/> 
        </div>
      }

      {/* Button to show rules */}
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
            <img src={easy ? 'images/image-rules.svg' : "images/image-rules-bonus.svg"} alt="Rules to play the game"></img>
          </div>
        </div>

      </div>
      
    </div>
  );
}
