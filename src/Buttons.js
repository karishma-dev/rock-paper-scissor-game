// Buttons [Rock, paper, scissor, lizard, spock]
export default function Buttons({display, result}){

    // Empty array to initialize buttons in
    let array = [];

    // Forin loop to iterate over displaay object
    for (const key in display) {
        let element = (
          <>
            <button id = {key} value = {key} className = "button" onClick = {() => result(key, display[key])}>
              <img src= {display[key]} alt = {key}/>
            </button>
          </>
        );
        array.push(element);
    }
    return array;
  }