const warning = document.getElementById("toast-warning");
const reviewQuiz = document.getElementById("reviewQuiz");
reviewQuiz

const token = localStorage.getItem('authToken');
if (!token) {
  showtoast('You are not logged in! Please log in to continue.');
}

function closebtn(){
  warning.classList.add('hidden')
}

function showtoast(message){
  warning.classList.remove('hidden')
  text.innerHTML=message
  setTimeout(() => {
      closebtn()
  }, 2500);
}
document.getElementById('questionForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const questionData = {
      type: document.querySelector('input[name="type"]:checked').value,
      question: document.getElementById('question').value,
      correct_answer: document.getElementById('correctAnswer').value,
      answers: document.getElementById('Answers').value.split(',')
    };
  
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:8080/questions/AddQuestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(questionData)
      });
  
      if (response.ok) {
        showtoast('Question added successfully!');
        // fetchQuestions();  
      } else {
        const errorData = await response.json();
        showtoast(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error adding question:', error);
    }
  });

reviewQuiz.addEventListener('click' , ()=>{
  window.location.href = "./QuizMaster.html"
});







// // Select elements
// const questionsContainer = document.getElementById('questionsList');
// const questionForm = document.getElementById('questionForm');
// const formTitle = document.getElementById('formTitle');
// const questionIdInput = document.getElementById('questionId');
// const token = localStorage.getItem('authToken');

// // Fetch all questions
// async function fetchQuestions() {
//   const res = await fetch("http://localhost:8080/questions/getAllQuestions");
//   const data = await res.json();
//   displayQuestions(data);
// }

// // Display questions on the page
// function displayQuestions(questions) {
//   questionsContainer.innerHTML = ''; // Clear previous questions
//   questions.forEach(question => {
//     const questionElement = document.createElement('div');
//     questionElement.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow-md');

//     questionElement.innerHTML = `
//       <p><strong>Type:</strong> ${question.type}</p>
//       <p><strong>ID:</strong> ${question.ID}</p>
//       <p><strong>Question:</strong> ${question.question}</p>
//       <p><strong>Correct Answer:</strong> ${question.correct_answer}</p>
//       <p><strong>Incorrect Answers:</strong> ${question.incorrect_answers.join(', ')}</p>
//       <button class="bg-green-500 text-white px-2 py-1 rounded-lg mt-2" onclick="editQuestion('${question._id}')">Edit</button>
//       <button class="bg-red-500 text-white px-2 py-1 rounded-lg mt-2 ml-2" onclick="deleteQuestion('${question._id}')">Delete</button>
//     `;

//     questionsContainer.appendChild(questionElement);
//   });
// }

// questionForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
  
//     const questionId = questionIdInput.value; 
//     const type = document.getElementById('type').value;
//     const ID = document.getElementById('ID').value;
//     const question = document.getElementById('question').value;
//     const correct_answer = document.getElementById('correctAnswer').value;
//     const incorrect_answers = document.getElementById('incorrectAnswers').value.split(',');
  
//     let requestData = { type, ID ,question, correct_answer, incorrect_answers };
  
//     if (questionId) {
//       // If editing, include the ID in the request body
//       requestData.id = questionId; 
//       await fetch(`http://localhost:8080/questions/editQuestion/${questionId}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(requestData),
//       });
//     } else {
//       const response = await fetch("http://localhost:8080/questions/AddQuestion", {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(requestData),
//       });
  
//       if (!response.ok) {
//         const errorData = await response.json(); // Get error details
//         console.error('Error Response:', errorData);
//         return;
//       }
//     }
  
//     questionForm.reset();
//     questionIdInput.value = ''; 
//     formTitle.textContent = 'Add New Question'; 
//     fetchQuestions(); 
//   });

// async function editQuestion(id) {
//   const res = await fetch(`${baseUrl}/getAllQuestions`);
//   const data = await res.json();
//   const questionToEdit = data.find(question => question._id === id);


//   questionIdInput.value = questionToEdit._id;
//   document.getElementById('type').value = questionToEdit.type;
//   document.getElementById('ID').value = questionToEdit.ID;
//   document.getElementById('question').value = questionToEdit.question;
//   document.getElementById('correctAnswer').value = questionToEdit.correct_answer;
//   document.getElementById('incorrectAnswers').value = questionToEdit.incorrect_answers.join(',');

//   formTitle.textContent = 'Edit Question';
// }

// async function deleteQuestion(id) {
//   await fetch(`http://localhost:8080/questions/deleteQuestion/${id}`, 
//     { method: 'DELETE' });
//   fetchQuestions(); 
// }

// fetchQuestions();
