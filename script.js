const display = document.getElementById("display");
let ans = "";
let memory = 0;
let angleMode = "Rad"; // default rad mode
let evaluated = false; // allows for next exp to be typed while removing the old answer

function appendDisplay(input){
    if (evaluated){
        display.value = "";
        evaluated = false;
    }

    const start = display.selectionStart;
    const end = display.selectionEnd;
    const current = display.value;
    const updated = current.slice(0, start) + input + current.slice(end);
    display.value = updated;
    display.focus();
    display.selectionStart = display.selectionEnd = start + input.length;
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

function addToHistory(expression, result) {
    const historyList = document.getElementById("historyList");
    const li = document.createElement("li");
    li.textContent = `${expression} = ${result}`;
    li.onclick = () => {
        display.value = expression;
        display.scrollLeft = display.scrollWidth;
    };
    historyList.prepend(li); // adds to the top
}

function clearHistory() {
    document.getElementById("historyList").innerHTML = "";
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
    if (display.value.trim() === ""){
        display.value = ""; // avoids undefined result
        return;
    }
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
        addToHistory(expr, ans);
        evaluated = true;
    } catch {
        display.value = "Error";
        evaluated = true;
    }
}

//keyboard inputs
document.addEventListener('keydown', (event) =>{
    const key = event.key;

    const isControlKey = event.ctrlKey || event.altKey || event.metaKey; // allow control keys (like arrows)
    const isSpecialKey = ['ArrowLeft', 'ArrowRight', 'Backspace', 'Delete'].includes(key);

    if (!isControlKey && !isSpecialKey) {
        event.preventDefault(); // disable typing
    }

    if(!isNaN(key)){
        //numbers between 0-9
        appendDisplay(key);
    }
    else if(['+','-','*','/','.',')','('].includes(key)){
        appendDisplay(key);
    }
    else if(key === 'Enter'){
        event.preventDefault();
        calculate();
    }
    else if(key === 'c'){
        clearDisplay();
    }
    else if(key === 'a'){
        previousAnswer();
    }
})

