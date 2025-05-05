const display = document.getElementById("display");
let ans = "";
let angleMode = "Rad"; // default rad mode

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

function convertAngleMode(){
    angleMode = angleMode === "Rad" ? "Deg" : "Rad";
    document.getElementById("angleToggle").textContent = angleMode;
}

function calculate(){
    try {
        let expr = display.value;

        if(angleMode === "Deg"){
            expr = expr.replace(/(sin|cos|tan)\(([^)]+)\)/g, (match, fn, val) =>{
                return `${fn}(( ${val} ) * pi / 180)`; 
            })
        }

        ans = math.evaluate(expr);
        if (Math.abs(ans) < 1e-10) {
            ans = 0;
        }
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
    else if(['+','-','*','/','.',')'].includes(key)){
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
