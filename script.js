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