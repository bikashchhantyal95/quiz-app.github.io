const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("question-counter");
const scoreText = document.getElementById("score");
//console.log(question);
//console.log(Array.from(choices));

let currentQuestion = {};
let acceptAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "What is the capital of Nepal?",
    choice1: "Pokhara",
    choice2: "Dharan",
    choice3: "Kathmandu",
    choice4: "Naraangadh",
    answer: 3,
  },
  {
    question: "Who is the first prime minister of Nepal?",
    choice1: "Gagan Singh",
    choice2: "Bhimsen Thapa",
    choice3: "Pushpa Kamal Dahal",
    choice4: "Girija Prasad Koirala",
    answer: 2,
  },
  {
    question: "Who is the first President of Nepal?",
    choice1: "Ram Baran Yadhav",
    choice2: "Bhimsen Thapa",
    choice3: "Pushpa Kamal Dahal",
    choice4: "Girija Prasad Koirala",
    answer: 1,
  },
];
//constants
const CORRECT_BONUS = 5;
const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  //console.log(availableQuestions);
  getNewQuestion();
};

getNewQuestion = () => {
  //console.log("Hello");
  if (availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS) {
    return window.location.assign("./index.html");
  }

  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;
  //console.log(question);
  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    //console.log(number);
    choice.innerText = currentQuestion["choice" + number];
  });
  availableQuestions.splice(questionIndex, 1);
  //console.log(availableQuestions);
  acceptAnswers = true;
};

//console.log(choices);
choices.forEach((choice) => {
  //console.log(choice);
  choice.addEventListener("click", (e) => {
    if (!acceptAnswers) return;

    acceptAnswers = false;
    const selectedChoice = e.target;
    // console.log(selectedChoice.innerText);
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    //console.log(classToApply);

    if (classToApply == "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);
    // console.log(selectedAnswer);
    // console.log(currentQuestion.answer);
    // console.log(currentQuestion);
    // console.log(selectedAnswer == currentQuestion.answer);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
