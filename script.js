const display = document.getElementById("display");

function appendDisplay(input){
    display.value += input;
    
    //scrolls with numbers
    display.scrollLeft = display.scrollWidth;
}

function clearDisplay(){
    display.value = "";
}

function calculate(){
    try {
        display.value = Function('return (' + display.value + ')')();
    } catch {
        if(display.value === "" || display.value === "Error"){
            display.value = ""
            console.log(display.value)
        }
        else{
            display.value = "Error";
            console.log(display.value)
        }
    }
}
