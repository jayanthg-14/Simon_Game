let isRoundComplete = false;
let isWrongInput = false;
let colorCount = 0;
let colorsArr = [];

document.body.style.backgroundColor = "#2d1a75";

let levelNo = document.getElementById("levelNo");
let ScoreNo = document.getElementById("scoreNo");
let gameoverSpan = document.getElementById("gameoverSpan");
let buttons = document.querySelectorAll(".btn");

buttons.forEach(btn => {
        btn.disabled = true;
});



let startButton = document.getElementById('startBtn');



startButton.addEventListener("click", ()=>{
    ScoreNo.textContent = 0;
    levelNo.textContent = 1;
    gameoverSpan.textContent = ""
    isRoundComplete = false;
    isWrongInput = false;
    colorCount = 0;
    colorsArr = [];
    roundExecution(1,0);
})


async function roundExecution(round, score){
    levelNo.textContent = round;
    randomColorGenerator(round);
    buttons.forEach(btn => {
        btn.disabled = true;
    });

    
    await timer(round, colorsArr);

    buttons.forEach(btn => {
        btn.disabled = false;
    });

    score = await testing(round, score);
    if(isWrongInput){
        gameoverSpan.textContent = "Game Over";
        startButton.textContent = "Restart"
        startButton.disabled = false;
        return score;
    }
    
    roundExecution(round+1, score);

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function timer(round) {
    let button = document.getElementById(colorsArr[round-1])
    button.classList.toggle("buttonBlink");
    await sleep(500);
    button.classList.toggle("buttonBlink");
}


function randomColorGenerator(round){
    let colors = ['green', 'red', 'yellow', 'blue'];
    let random = Math.floor(Math.random() * 4);
    colorsArr[round-1] = colors[random];
}


function testing(presentRoundNumber, score){
    
    return new Promise((resolve)=>{
        console.log(colorsArr);
        function handlerFunc(event){
            let buttonInput = event.target.value;
            if(colorsArr[colorCount] != buttonInput){
                isWrongInput = true
            }
            else{
                score++;
                ScoreNo.textContent = score;
            }

            colorCount++;

            
        
            if(presentRoundNumber == colorCount || isWrongInput)
            {
                colorCount = 0;
                buttons.forEach(btn =>
                    btn.removeEventListener("click", handlerFunc)
                );
                resolve(score);
            }
        }
        buttons.forEach(btn =>
            btn.addEventListener("click", handlerFunc)
        );
    })
}


