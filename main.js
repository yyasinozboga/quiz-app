const startBtn = document.querySelector(".start-quiz-btn");
const nextBtn = document.querySelector(".next-btn");
const container = document.querySelector(".container");
const quizTitle = document.querySelector(".quiz-title");
const quizContainer = document.querySelector(".quiz-container");
const quizlist = document.querySelector(".quiz-list");
const count = document.querySelector(".count");
const countLength = document.querySelector(".count-length");
const time = document.querySelector(".time");
const timeLine = document.querySelector(".timeline");
const timeTitle = document.querySelector(".time-title");
const totalContainer = document.querySelector(".total-container");
const totalTitle = document.querySelector(".total-title");
const finishBtn = document.querySelector(".finish-btn");
const againStartBtn = document.querySelector(".start-btn");

let total = 0;
let index = 0;
let line = 0;
let isSelected = false;

class Question {
  constructor(title, answers, correctAnswer) {
    this.title = title;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
  }

  checkTheAnswer(answer) {
    if (this.correctAnswer === answer) {
      total += 20;
      return true;
    }
  }
}

const questions = [
  new Question(
    "1-Hangisi javascript paket yönetimi uygulamasıdır?",
    { a: "Node.js", b: "TypeScript", c: "Npm", d: "Nuget" },
    "c",
  ),
  new Question(
    "2-Hangisi frontend kapsamında değerlendirilmez?",
    { a: "Css", b: "Html", c: "JavaScript", d: "Sql" },
    "d",
  ),
  new Question(
    "3-Hangisi backend kapsamında değerlendirilir?",
    { a: "Node.js", b: "TypeScript", c: "Angular", d: "React" },
    "a",
  ),
  new Question(
    "4-Hangisi javascript proglamlama dilini kullanmaz?",
    { a: "React", b: "Angular", c: "Vuejs", d: "Asp.net" },
    "d",
  ),
];

class Quiz {
  constructor(questions) {
    this.questions = questions;
  }
}

const quiz = new Quiz(questions);

const startQuiz = () => {
  total = 0;
  isSelected = false;
  startBtn.classList.add("hide");
  container.classList.remove("hide");
  totalContainer.classList.add("hide");
  displayQuestions(quiz.questions[index]);
  timeFn();
  timeTitle.innerHTML = "Kalan Süre";
  nextBtn.innerHTML = "Sonraki Soru";
  count.innerHTML = 1;
};

startBtn.addEventListener("click", startQuiz);
againStartBtn.addEventListener("click", startQuiz);

//! Next Quiz
nextBtn.addEventListener("click", () => {
  index++;

  if (index <= 3) {
    displayQuestions(quiz.questions[index]);
    count.innerHTML = index + 1;
    countLength.innerHTML = quiz.questions.length;
    timeFn();
    nextBtn.classList.add("hide");
    isSelected = false;
    timeTitle.innerHTML = "Kalan Süre";
  }

  if (index === 3) {
    nextBtn.innerHTML = "Quiz sonucu";
  }

  if (index > 3) {
    index = 0;
    container.classList.add("hide");
    totalContainer.classList.remove("hide");

    totalTitle.innerHTML = `Tebrikler quiz den ${total} puan aldınız!`;
  }
});

finishBtn.addEventListener("click", () => {
  totalContainer.classList.add("hide");
  startBtn.classList.remove("hide");
});

const displayQuestions = (questions) => {
  console.log(questions);

  quizTitle.innerHTML = questions.title;

  let options = "";

  for (value in questions.answers) {
    options += `
        <li class="quiz-item" onclick="checkTheAnswer(this)">
            <div>
                <h3><span>${value}</span>:</h3>
                <p class="question-title">${questions.answers[value]}</p>
            </div>
        </li>
    `;
  }

  quizlist.innerHTML = options;
};

console.log(index);

const correctIcon = '<i class="fa-solid fa-check"></i>';
const unCorrectIcon = '<i class="fa-solid fa-xmark"></i>';

//! Check answer
const checkTheAnswer = (element) => {
  isSelected = true;

  const answer = element.querySelector("span").innerHTML;
  if (isSelected) {
    if (questions[index].checkTheAnswer(answer)) {
      element.classList.add("success");
      element.insertAdjacentHTML("beforeend", correctIcon);
    } else {
      // const answers = [...document.querySelectorAll("span")];

      // answers.forEach((answer) => {
      //   if (answer.innerHTML !== questions[index].correctAnswer) {
      //     answer.closest(".quiz-item").classList.add("danger");
      //   } else {
      //     answer.closest(".quiz-item").classList.add("success");
      //   }
      // });

      element.classList.add("danger");
      element.insertAdjacentHTML("beforeend", unCorrectIcon);

      const span = quizlist.querySelectorAll("span");

      span.forEach((span) => {
        if (span.innerHTML === questions[index].correctAnswer) {
          const quizItem = span.closest(".quiz-item");

          quizItem.classList.add("success");
          quizItem.insertAdjacentHTML("beforeend", correctIcon);
        }
      });
    }
  }

  const quizItems = document.querySelectorAll(".quiz-item");

  quizItems.forEach((quizItem) => {
    quizItem.classList.add("disabled");
  });

  nextBtn.classList.remove("hide");
};

//! Quiz Time
const timeFn = () => {
  timeLine.style.width = "0%";

  time.innerHTML = 10;

  function quizTime() {
    Number(time.innerHTML--);

    if (Number(time.innerHTML) === 0 || isSelected) {
      clearInterval(interval);
      nextBtn.classList.remove("hide");
      timeTitle.innerHTML = "Süre Bitti";
    }

    if (Number(time.innerHTML) === 0 && !isSelected) {
      const span = quizlist.querySelectorAll("span");

      span.forEach((span) => {
        if (span.innerHTML === questions[index].correctAnswer) {
          const quizItem = span.closest(".quiz-item");

          quizItem.classList.add("success");
          quizItem.insertAdjacentHTML("beforeend", correctIcon);
        }

        span.closest(".quiz-item").classList.add("disabled");
      });
    }
  }

  function timeLineFn() {
    line++;
    timeLine.style.transition = "width .3s";
    timeLine.style.width = `${line}%`;

    if (timeLine.style.width === "100%" || isSelected) {
      clearInterval(lineTime);
      line = 0;
      timeLine.style.transition = "none";
    }
  }

  const interval = setInterval(quizTime, 1000);
  const lineTime = setInterval(timeLineFn, 100);
};
