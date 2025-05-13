const input = document.querySelector('[inputBox]');
const buttons = document.querySelectorAll('button');

let string="";

const resultAud = new Audio("./assets/result.mp3");
const delAud = new Audio("./assets/del.mp3");
const buttonAud = new Audio("./assets/button.mp3");

function btnAnimation(key){
    buttons.forEach(pressBtn=>{
    if(pressBtn.innerText==key){
        pressBtn.classList.add('active');
        setTimeout(() => {
            pressBtn.classList.remove('active');
        }, 200);
    }
});
}

function resultCalculate(){
    resultAud.currentTime = 0;
    resultAud.play();
    input.value = "";
    try {
        string = eval(string).toString();
        input.value= string;
    } catch (error) {
        input.value="Undefined";
        string = "";
    }
}

function del(){
    delAud.currentTime = 0;
    delAud.play();
    string = string.slice(0,-1);
    input.value = string;
}

function clearAll(){
    delAud.currentTime = 0;
    delAud.play();
    string = "";
    input.value = string; 
}

function calc(key){
    string += key;
    input.value=string;
}

let arr= Array.from(buttons);

arr.forEach(button=>{
    button.addEventListener('click',(e)=>{
        if(e.target.innerHTML== "=" && string!==""){
            resultCalculate();   
        }
        else if(e.target.innerHTML == "C"){
            clearAll();
        }
        else if(e.target.innerHTML == "DEL"){
            del();
        }
        else{
            calc(e.target.innerHTML);
        }
    });
});

const allowedChar = ['1','2','3','4','5','6','7','8','9','0','*','/','+','-','%','.'];
document.addEventListener('keydown',(e)=>{
    e.preventDefault();
    if(e.key == "Enter" && string !=""){
        btnAnimation("=");
        resultCalculate();
    }
    else if(e.key == "Backspace"){
        btnAnimation("DEL");
        del();
    }
    else if(e.key == "Delete" || e.key == "c"){
        btnAnimation("C")
        clearAll();
    }
    else if(allowedChar.includes(e.key)){
        btnAnimation(e.key)
        calc(e.key);
    }

});
