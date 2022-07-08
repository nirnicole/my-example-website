const problemElement = document.querySelector(".problem");
const ourForm = document.querySelector(".our-form");
const ourField = document.querySelector(".our-field");
const pointsNeeded = document.querySelector(".points-needed");
const mistakesAllowed = document.querySelector(".mistakes-allowed");
const progressBar = document.querySelector(".progress-inner");
const endMsg = document.querySelector(".end-msg");
const resetButton = document.querySelector(".reset-btn");

const mathUtil = {
    '+': function (x, y) { return x + y; },
    '-': function (x, y) { return x - y; },
    'x': function (x, y) { return x * y; }
};

let state = {
    score: 0,
    wrongAnswers: 0
};


function updateProblem() {
    state.currentProblem = generateProblem();
    problemElement.innerHTML = `${state.currentProblem.numberOne} ${state.currentProblem.operator} ${state.currentProblem.numberTwo}`;
    ourField.value = "";
    ourField.focus();
}

updateProblem();

function generateNumber(max) {
    return Math.floor(Math.random() * (max+1));
}

function generateProblem() {
    return {
        numberOne: generateNumber(10),
        numberTwo: generateNumber(10),
        operator:  ['+', '-', 'x'][generateNumber(2)]
    };
}

ourForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    
    const prob = state.currentProblem;
    let correctAnswer = mathUtil[prob.operator](prob.numberOne, prob.numberTwo);
    console.log(correctAnswer);

    if(parseInt(ourField.value, 10) === correctAnswer ) {
        state.score++;
        pointsNeeded.textContent = 10 - state.score;
        problemElement.classList.add("animate-right");
        setTimeout(()=> problemElement.classList.remove("animate-right"), 331);       //an arrow function
        updateProblem();
        renderProgressBar();
    }else{
        state.wrongAnswers++;
        mistakesAllowed.textContent = 3-state.wrongAnswers;
        ourField.value = "";
        setTimeout(()=> ourField.focus(), 331);       //an arrow function
        problemElement.classList.add("animate-wrong");
        setTimeout(()=> problemElement.classList.remove("animate-wrong"), 331);       //an arrow function

    }

    checkLogic();
}


function checkLogic() {
    //if you won
    if(state.score === 10){
        endMsg.textContent = "Congrats! you won.";
        document.body.classList.add("overlay-is-open");
        setTimeout(()=> resetButton.focus(), 331);       //an arrow function
    }

    //if you lost
    if(state.wrongAnswers === 3){
        endMsg.textContent = "Sorry! you loast.";
        document.body.classList.add("overlay-is-open");
        setTimeout(()=> resetButton.focus(), 451);       //an arrow function
    }

}

resetButton.addEventListener("click", resetGame);

function resetGame(){
    document.body.classList.remove("overlay-is-open");
    updateProblem();
    state.score = 0;
    state.wrongAnswers = 0;
    pointsNeeded.textContent = 10;
    mistakesAllowed.textContent = 2;
    renderProgressBar();
}

function renderProgressBar(){
    progressBar.style.transform = `scaleX(${state.score/10})`;
}
