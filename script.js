const questions = [
    {
        question: "What is a correct syntax to output Hello World in C++?",
        answers: [
            {text: " cout << Hello World ", correct: true},
            {text: "print(Hello World)", correct: false},
            {text: "cin << Hello World", correct: false},
            {text: "out << Hello World", correct: false}
        ]
    },
    {
        question: "Who invented C++?",
        answers: [
            {text: "Dennis Ritchie", correct: false},
            {text: "Ken Thompson", correct: false},
            {text: "Brian Kernighan", correct: false},
            {text: "Bjarne Stroustrup", correct: true},
        ]
    },
    {
        question: "What is C++?",
        answers: [
            {text: "C++ is an object oriented programming language", correct: false},
            {text: "C++ is a procedural programming language", correct: false},
            {text: "C++ supports both procedural and object oriented programming language", correct: true},
            {text: "C++ is a functional programming language", correct: false},
        ]
    },
    {
        question: "Which of the following is the correct syntax of including a user defined header files in C++?",
        answers: [
            {text: "#include [userdefined]", correct: false},
            {text: "#include “userdefined", correct: true},
            {text: "#include <userdefined.h>", correct: false},
            {text: "#include <userdefined>", correct: false},
        ]
    },
    {
        question: "Which of the following is used for comments in C++?",
        answers: [
            {text: "/* comment */", correct: false},
            {text: "// comment */", correct: false},
            {text: "// comment", correct: false},
            {text: " both // comment or /* comment */", correct: true},
        ]
    },
    {
        question: " Which of the following extension is used for user-defined header file in c++?",
        answers: [
            {text: "hg", correct: false},
            {text: "cpp", correct: false},
            {text: "h", correct: true},
            {text: "hf", correct: false},
        ]
    },
    {
        question: "Which of the following is a correct identifier in C++?",
        answers: [
            {text: "VAR_1234", correct: true},
            {text: "$var_name", correct: false},
            {text: "7VARNAME", correct: false},
            {text: "7var_name", correct: false},
        ]
    },
    {
        question: "Which of the following is not a type of Constructor in C++?",
        answers: [
            {text: "Default constructor", correct: false},
            {text: "Parameterized constructor", correct: false},
            {text: "Copy constructor", correct: false},
            {text: "Friend constructor", correct: true},
        ]
    },
    {
        question: "Which of the following approach is used by C++?",
        answers: [
            {text: "Left-right", correct: false},
            {text: "Right-left", correct: false},
            {text: "Bottom-up", correct: true},
            {text: "Top-down", correct: false},
        ]
    },
    {
        question: "What is virtual inheritance in C++?",
        answers: [
            {text: " C++ technique to enhance multiple inheritance", correct: false},
            {text: "C++ technique to ensure that a private member of the base class can be accessed somehow", correct: false},
            {text: "C++ technique to avoid multiple inheritances of classes", correct: false},
            {text: "C++ technique to avoid multiple copies of the base class into children/derived class", correct: true},
        ]
    },
    {
        question: "What is the difference between delete and delete[] in C++?",
        answers: [
            {text: "delete is syntactically correct but delete[] is wrong and hence will give an error if used in any case", correct: false},
            {text: "delete is used to delete normal objects whereas delete[] is used to pointer objects", correct: false},
            {text: "delete is a keyword whereas delete[] is an identifier", correct: false},
            {text: "delete is used to delete single object whereas delete[] is used to multiple(array/pointer of) objects", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
     score = 0;
     nextButton.innerHTML = "Next";
     showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + " . " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button  = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");

        }
         button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
});

startQuiz();
