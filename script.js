const questions = [
    {
        question: "Where is Loki from?",
        answers: [
            { text: "The Carpathian Mountains", correct: false},
            { text: "Mureş County, Transylvania", correct: true},
            { text: "Asgard", correct: false},
            { text: "Brcko, Bosnia", correct: false},
        ]
    },
   {
        question: "What is our nickname for Loki when he cries?",
        answers: [
            { text: "Peep-peep", correct: true},
            { text: "Menace", correct: false},
            { text: "Lonkadonk", correct: false},
            { text: "Babydog", correct: false},
        ]
    },
    {
        question: "On walks, what is Loki's favourite thing to pilfer?",
        answers: [
            { text: "A ball, especially from another dog", correct: false},
            { text: "A stick", correct: false},
            { text: "Anything edible", correct: false},
            { text: "All of the above", correct: true},
        ]
    },
    {
        question: "How does Loki tell us it's walk time?",
        answers: [
            { text: "Stares into your soul until you stand up and say 'Right'", correct: false},
            { text: "Stands by the door", correct: false},
            { text: "Finds a shoe and starts flinging it around in your direction", correct: true},
            { text: "Drags his harness out of the basket", correct: false},
        ]
    },
     {
        question: "If Loki ruled the world, he would:",
        answers: [
            { text: "Roam the woods all day", correct: false},
            { text: "Be able to climb trees to get to the squirrels", correct: false},
            { text: "Be best friends with the binmen", correct: false},
            { text: "All of this, and persuade the cats to play with him too", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    } 
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();
