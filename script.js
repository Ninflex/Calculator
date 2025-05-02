const display = document.getElementById("display");
let ans = "";

function appendDisplay(input){
    display.value += input;
    //scrolls with numbers
    display.scrollLeft = display.scrollWidth;
}

function clearDisplay(){
    display.value = "";
}

function previousAnswer(){
    if(ans === ""){
        display.value += "0"
    }
    else{
        display.value += ans;
    }
}

function advanced() {
    const panel = document.getElementById("advancedPanel");
    panel.classList.toggle("visible");
}

function calculate(){
    try {
        ans = math.evaluate(display.value);
        display.value = ans;
    } catch {
        if(display.value === ""){
            display.value = ""
        }
        else{
            display.value = "Error";
        }
    }
}

//Keyboard inputs
document.addEventListener('keydown', (event) =>{
    const key = event.key;

    if(!isNaN(key)){
        //numbers between 0-9
        appendDisplay(key);
    }
    else if(['+','-','*','/','.'].includes(key)){
        appendDisplay(key);
    }
    else if(key === 'Enter'){
        event.preventDefault();
        calculate();
    }
    else if(key === 'Backspace'){
        display.value = display.value.slice(0,-1);
    }
    else if(key === 'c'){
        clearDisplay();
    }
    else if(key === 'a'){
        previousAnswer();
    }
})
