//Get the input field where the calculation is displayed
let display=document.getElementById('display');
//This flag helps determine if the last action was a calculation
let justCalculated=false;

function append(value){
    const operators=['+','-','*','/','√'];
    // If the previous action was a calculation and the new input is a number/dot,
    // then clear the display for a fresh input
    if(justCalculated){
        if(!operators.includes(value)){
            display.value='';
        }
        justCalculated=false;
    }
    display.value+=value;
}

function clearDisplay(){
    display.value='';
    justCalculated=false;
}

function squareRoot(){
    try{
        if(display.value.trim() === "")return;
        const evaluated=Function('"use strict"; return('+display.value+')')();
        if(isNaN(evaluated)||evaluated<0){
            display.value = "ERROR";
        }else{
            display.value=Math.sqrt(evaluated);
            justCalculated=true;
        }
    }catch{
        display.value="ERROR";
        justCalculated=true;
    }

}
function calculate(){
    try{
        if(display.value.trim()==="") return;
            const result = Function('"use strict"; return (' + display.value + ')')();
            display.value = (result === Infinity || result === -Infinity) ? "Error" : result;
            justCalculated = true;
        } catch {
            display.value = "Error";
            justCalculated = true;
        }
}
//Add keyboard support for calculator operations
document.addEventListener('keydown', (e) => {
  const allowedKeys = '0123456789+-*/.';
  if (allowedKeys.includes(e.key)) {
    append(e.key);
  } else if (e.key === 'Enter' || e.key === '=') {
    e.preventDefault();
    calculate();
  } else if (e.key === 'Backspace') {
    display.value = display.value.slice(0, -1);
  } else if (e.key === 'Escape') {
    clearDisplay();
  }
});
