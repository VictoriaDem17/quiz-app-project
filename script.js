const questionsArray = [];

function addQuestion() {
  const question = {
      questionText: document.querySelector('#question-input').value,
      options: [],
      correctOptionIndex: null,
      correctOptionHighlighted: false,
  };

  const optionInputs = document.querySelectorAll('.option-input');
  const correctInputs = document.querySelectorAll('.correct-input');
  
  optionInputs.forEach((input, index) => {
      question.options.push({
          optionText: input.value,
          isCorrect: correctInputs[index].checked
      });
      if (correctInputs[index].checked) {
          question.correctOptionIndex = index;
      }
  });

  questionsArray.push(question);
  renderQuestions();
  clearForm();
}

function renderQuestions() {
  const questionList = document.getElementById('questionList');
  questionList.innerHTML = '';

  questionsArray.forEach((question, index) => {
      const questionDiv = document.createElement('div');
      questionDiv.innerHTML = `<b>Question ${index + 1}:</b> ${question.questionText}`;
      const optionsList = document.createElement('ul');

      question.options.forEach((option, optionIndex) => {
          const optionItem = document.createElement('li');
          optionItem.innerText = option.optionText;

          if (question.correctOptionHighlighted && optionIndex === question.correctOptionIndex) {
              optionItem.style.color = 'green';
          } else if (question.correctOptionHighlighted) {
              optionItem.style.color = 'red';
          }

          optionsList.appendChild(optionItem);
      });

      const revealAnswerButton = document.createElement('button');
      revealAnswerButton.innerText = 'Reveal correct answer';
      revealAnswerButton.addEventListener('click', () => {
          question.correctOptionHighlighted = true;
          renderQuestions();
      });

      questionDiv.appendChild(optionsList);
      questionDiv.appendChild(revealAnswerButton);
      questionList.appendChild(questionDiv);
  });
}

function clearForm() {
  document.querySelector('#question-input').value = '';
  const optionInputs = document.querySelectorAll('.option-input');
  const correctInputs = document.querySelectorAll('.correct-input');

  optionInputs.forEach(input => {
      input.value = '';
  });
  correctInputs.forEach(radio => {
      radio.checked = false;
  });
}

//My own questions array for checking if different functions work
const quizData = [
    {
    question: "Who is the creator of JavaScript?",
    options: [
      { text: "Guido van Rossum", isCorrect: false },
      { text: "James Gosling", isCorrect: false },
      { text: "Brendan Eich", isCorrect: true },
      { text: "Bjarne Stroustrup", isCorrect: false },
    ],
  },
  {
    question: "What was JavaScript called in September 1995?",
    options: [
      { text: "LiveScript", isCorrect: false },
      { text: "Java", isCorrect: false },
      { text: "Latte Macchiato", isCorrect: false },
      { text: "Mocha", isCorrect: true },
    ],
  },
  {
    question: "Which JavaScript statement is incorrect?",
    options: [
      { text: '"b" + "a" + + "a" + "a" //output "baNaNa"', isCorrect: false },
      { text: "Number.MIN_VALUE > 0 //true", isCorrect: true },
      { text: "functions can execute themselves", isCorrect: false },
      { text: "undefined never can be defined", isCorrect: false },
    ],
  },
  {
    question: "Which JavaScript syntax is correct?",
    options: [
      { text: 'return {""};', isCorrect: false },
      { text: '1 + 2 + "3" //output "123"', isCorrect: false },
      { text: "[,*,].length", isCorrect: false },
      { text: ";let a = 2", isCorrect: true },
    ],
  },
  {
    question: "How many years in the row JavaScript keep being the most popular programming language between developers?",
    options: [
      { text: "10 years", isCorrect: false },
      { text: "11 years", isCorrect: true },
      { text: "12 years", isCorrect: false },
      { text: "13 years", isCorrect: false },
    ],
  },
];

function filterQuestions() {
  const contentInput = document.getElementById("content-input").value;
  const filteredQuestions = quizData.filter((question) =>
    question.question.toLowerCase().includes(contentInput.toLowerCase())
  );

  const filteredQuestionsDiv = document.querySelector(".filteredQuestions");
  filteredQuestionsDiv.innerHTML = "";

  if (filteredQuestions.length === 0) {
    const noResultMessage = document.createElement("p");
    noResultMessage.textContent = "No questions found";
    filteredQuestionsDiv.appendChild(noResultMessage);
  } else {
    filteredQuestions.forEach((question) => {
      const questionElement = document.createElement("div");
      questionElement.classList.add("question");
      
      const questionText = document.createElement("p");
      questionText.textContent = question.question;
      questionText.style.fontWeight = "bold";
      questionElement.appendChild(questionText);
      questionElement.style.marginTop = "10px";

      const optionsElement = document.createElement("ol");
      optionsElement.classList.add("options");
      optionsElement.style.padding = "10px";

      question.options.forEach((option) => {
        const optionElement = document.createElement("li");
        optionElement.textContent = option.text;
        optionsElement.appendChild(optionElement);
      });

      questionElement.appendChild(optionsElement);
      filteredQuestionsDiv.appendChild(questionElement);
    });
  }
}

function startQuiz() {
  const player1 = document.getElementById('name-input1').value;
  const player2 = document.getElementById('name-input2').value;
  
  const playersList = document.getElementById('playersList');
  playersList.innerHTML = 
  '<div>' + player1 + '<span id="scorePlayer1">0</span><button onclick="addScore(1, true)">Correct</button><button onclick="addScore(1, false)">Wrong</button></div>' +
  '<div>' + player2 + '<span id="scorePlayer2">0</span><button onclick="addScore(2, true)">Correct</button><button onclick="addScore(2, false)">Wrong</button></div>';
}

function addScore(playerNumber, isCorrect) {
  let scoreElement = document.getElementById('scorePlayer' + playerNumber);
  let score = parseInt(scoreElement.innerHTML);
  score += isCorrect ? 1 : -1;
  scoreElement.innerHTML = score;
}