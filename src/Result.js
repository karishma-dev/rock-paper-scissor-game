// Result Component
export default function Result({display, status, replay}){
    // Key of the buttons we have to display
    let key = [Object.keys(display)[0],Object.keys(display)[1] ];

    // Change color of play again button based on the result
    if(status === "You lose!"){
      document.documentElement.style.setProperty("--status-text", "red");
    }

    return (
      //Result Container 
      <div className='result-container'>
        
        {/* User picked Button */}
        <div className='btn'>
          <span className='btn-title'>You Picked</span>
          <button id={key[0]} className = "button">
            <img src= {display[key[0]]} alt={key}></img>
          </button>
        </div>

        {/* Status whether user won or lost or if the game is draw */}
        <div id='status'>
          <span>
            {status}
          </span>
          <button id='play-again' onClick={replay}>Play Again</button>
        </div>

        {/* Computer picked Button */}
        <div className='btn'>
          <span className='btn-title'>The House Picked</span>
          <button id={key[1]} className = "button">
            <img src= {display[key[1]]} alt={key}></img>
          </button>
        </div>
        
      </div>
    )
  }