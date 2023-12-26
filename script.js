const questionsArray = [];

function addQuestion() {
  const question = {
      questionText: document.querySelector('.question-input').value,
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
  document.querySelector('.question-input').value = '';
  const optionInputs = document.querySelectorAll('.option-input');
  const correctInputs = document.querySelectorAll('.correct-input');

  optionInputs.forEach(input => {
      input.value = '';
  });
  correctInputs.forEach(radio => {
      radio.checked = false;
  });
}

//JS2-W2-3
//MyQuestions
/*
..some function openNextForm(), onclick button "Next side" will open new windows with empty formDiv and h1,
and shows imput for searching questions by content and new button "Search"..

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

function filterQuestions(searchContent) {
    const filteredQuestions = quizData.filter((question) =>
      question.question.toLowerCase().includes(searchContent.toLowerCase())
    );
    
    filteredQuestions.forEach((question) => {
    const optionsHTML = question.options
        .map(
        (option) =>
        `<div class="option"><input type="radio" name="${question.question}" value="${option.text}"> ${option.text}</div>`
        )
        .join("");

    const questionHTML = 
    `<div class="question"><h3>${question.question}</h3>${optionsHTML}</div>`;

    document.getElementById("quiz").innerHTML += questionHTML;
});
}
*/