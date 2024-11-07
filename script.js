const questions = [
    {
        question: "What does MERN stand for?",
        options: ["MongoDB, Express, React, Node", "MySQL, Express, React, Node", "MongoDB, Ember, Redux, Node", "MongoDB, Express, Rails, Node"],
        answer: 0
    },
    {
        question: "Which database is commonly used in the MERN stack?",
        options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
        answer: 2
    },
    {
        question: "What is React primarily used for?",
        options: ["Back-end development", "Data management", "Building user interfaces", "Database management"],
        answer: 2
    },
    {
        question: "Which framework is used for the back-end in the MERN stack?",
        options: ["Express", "React", "Angular", "Vue"],
        answer: 0
    },
    {
        question: "Which of the following is a JavaScript runtime used in MERN?",
        options: ["Django", "Laravel", "Node.js", "Ruby on Rails"],
        answer: 2
    }
];

let currentQuestionIndex = 0;
let userAnswers = new Array(questions.length).fill(null);
const PASS_THRESHOLD = 70;
const POINTS_PER_QUESTION = 10;

function loadQuestion(index) {
    const questionText = document.getElementById("question-text");
    const answerOptions = document.getElementById("answer-options");

    questionText.innerText = questions[index].question;
    answerOptions.innerHTML = "";

    questions[index].options.forEach((option, i) => {
        const optionElement = document.createElement("label");
        optionElement.innerHTML = `<input type="radio" name="answer" value="${i}"> ${option}`;
        answerOptions.appendChild(optionElement);
    });

    if (userAnswers[index] !== null) {
        document.querySelector(`input[name="answer"][value="${userAnswers[index]}"]`).checked = true;
    }

    document.getElementById("prev-btn").style.display = index === 0 ? "none" : "inline-block";
    document.getElementById("next-btn").style.display = index === questions.length - 1 ? "none" : "inline-block";
    document.getElementById("submit-btn").style.display = index === questions.length - 1 ? "inline-block" : "none";
}

function saveAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        userAnswers[currentQuestionIndex] = parseInt(selectedOption.value);
    }
}

function nextQuestion() {
    saveAnswer();
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }
}

function previousQuestion() {
    saveAnswer();
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
}

function submitQuiz() {
    saveAnswer();
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
        if (userAnswers[i] === questions[i].answer) {
            score += POINTS_PER_QUESTION;
        }
    }

    const scorePercentage = (score / (questions.length * POINTS_PER_QUESTION)) * 100;
    document.getElementById("score").innerText = score + " out of " + (questions.length * POINTS_PER_QUESTION);
    document.getElementById("score-display").classList.remove("hidden");

    const resultMessage = document.getElementById("result-message");
    if (scorePercentage >= PASS_THRESHOLD) {
        resultMessage.innerText = "Congratulations! You passed the quiz.";
        resultMessage.style.color = "#00e676";
    } else {
        resultMessage.innerText = "Sorry, you did not pass. Better luck next time!";
        resultMessage.style.color = "#f44336";
    }
    resultMessage.classList.remove("hidden");
}

window.onload = function() {
    loadQuestion(currentQuestionIndex);
};
