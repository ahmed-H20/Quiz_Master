const progressBar = document.getElementById('progress-bar');
const percentageElement = document.getElementById('percentage');
const widthPrograss = document.getElementById('widthPrograss');
const warning = document.getElementById("toast-warning");
const countdownElement = document.getElementById('counter');
const nameImage = document.getElementById("nameImage")
const firstName = localStorage.getItem('firstName');
const lastName = localStorage.getItem('lastName');
const image = localStorage.getItem('image');
const email = localStorage.getItem('email');
const questionNumber = document.getElementById("questionNumber");
const btnNumber = document.getElementById("btnNumber");
const showQuestion = document.getElementById("showQuestion");

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

let totalTime = 5 * 60;
let timeLeft = 5 * 60;
let timeElapsed = 0;


const maxWidth = document.getElementById('progress-bar').parentElement.clientWidth;

nameImage.innerHTML= `<p>${firstName} ${lastName}</p>`

document.addEventListener('DOMContentLoaded', () => {

  if (image) {
    let imgElement = document.getElementById('userImage');
    let iconContainer = document.getElementById('change');
    const fileName = image.split('\\').pop().split('/').pop();
    imgElement.src = `../Images/${fileName}`
    imgElement.alt = `${firstName} ${lastName}`;
    imgElement.classList.remove('hidden');  
    iconContainer.style.display = "none"; 
  } else {
    let imgElement = document.getElementById('userImage');
    let iconContainer = document.getElementById('change');
    imgElement.style.display = "none"; 
    iconContainer.style.display = "block"; 
    iconContainer.innerHTML = `<i class="fa-solid fa-circle text-white text-[75px] mt-[30px]"></i>`;
  }
});


const countdownInterval = setInterval(() => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  countdownElement.textContent = `${minutes} : ${seconds < 10 ? '0' : ''}${seconds}`;
  
  timeLeft--;

  // When the countdown reaches zero, stop the interval
  if (timeLeft < 0) {
      clearInterval(countdownInterval);
      countdownElement.textContent = "Time's up!";
      window.location.href = "./Score.html";
  }
}, 1000);

const progressInterval = setInterval(() => {
  timeElapsed++;
  
  const progressPixels = (timeElapsed / totalTime) * maxWidth;
  
  widthPrograss.style.width = maxWidth ;
  progressBar.style.width = `${progressPixels}px`;
  const progressPercentage = (timeElapsed / totalTime) * 100;
  percentageElement.textContent = `${Math.floor(progressPercentage)}%`;
  
  if (timeElapsed >= totalTime) {
    clearInterval(progressInterval);
    percentageElement.textContent = '100%';
    progressBar.style.width = `${maxWidth}px`;
  }
}, 1000);


const question = document.getElementById('question');
const A = document.getElementById('A');
const B = document.getElementById('B');
const C = document.getElementById('C');
const D = document.getElementById('D');
let questions = [];
let currentIndex = 0;
var answers = [];
var selectedAnswers = {};

async function fetchQuestions() {
  try {
    const response = await fetch('http://localhost:8080/questions/getAllQuestions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Error fetching questions');
    }

    questions = await response.json();
    
    if (questions.length > 0) {
      loadQuestion(currentIndex);
    } else {
      console.error('No questions found');
    }
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
}

function loadQuestion(index) {
  question.textContent = `${index+1}. ${questions[index].question}`;
  A.textContent = questions[index].answers[0];
  B.textContent = questions[index].answers[1];

  if (questions[index].type === 'multiple') {
    C.classList.remove('hidden');
    D.classList.remove('hidden');
    C.textContent = questions[index].answers[2];
    D.textContent = questions[index].answers[3];
  } else {
    C.classList.add('hidden');
    D.classList.add('hidden');
  }

  const ans = [A, B, C, D];
  ans.forEach((element) => {
    element.style.backgroundColor = '';
  });

  if (selectedAnswers[index] !== undefined) {
    ans[selectedAnswers[index]].style.backgroundColor = '#ADB5BD'; 
  }
}
function selectAnswer(selectedElement, index) {
  const ans = [A, B, C, D];

  ans.forEach((element) => {
    element.style.backgroundColor = ''; 
  });

  selectedElement.style.backgroundColor = '#ADB5BD';

  selectedAnswers[index] = ans.indexOf(selectedElement);

}

function addAnswer(selectedAnswer, currentIndex) {
  const correctAnswer = questions[currentIndex].correct_answer;

  if (correctAnswer === selectedAnswer) {
    answers[currentIndex] = true;
  } else {
    answers[currentIndex] = false;
  }
  console.log(answers);
}

A.addEventListener('click', () => {
  selectAnswer(A, currentIndex);
  addAnswer(A.textContent, currentIndex);
});
B.addEventListener('click', () => {
  selectAnswer(B, currentIndex);
  addAnswer(B.textContent, currentIndex);
});
C.addEventListener('click', () => {
  selectAnswer(C, currentIndex);
  addAnswer(C.textContent, currentIndex);
});
D.addEventListener('click', () => {
  selectAnswer(D, currentIndex);
  addAnswer(D.textContent, currentIndex);
});

document.getElementById('nextQuestion').addEventListener('click', async (e) => {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion(currentIndex);
  }

  if (currentIndex > 0) {
    document.getElementById('previousQuestion').classList.remove('hidden');
  }

  if (currentIndex === questions.length - 1) {
    document.getElementById('nextQuestion').classList.add('hidden');
  }
});

document.getElementById('previousQuestion').addEventListener('click', async (e) => {
  if (currentIndex > 0) {
    currentIndex--;
    loadQuestion(currentIndex);
  }

  if (currentIndex < questions.length - 1) {
    document.getElementById('nextQuestion').classList.remove('hidden');
  }

  if (currentIndex === 0) {
    document.getElementById('previousQuestion').classList.add('hidden');
  }
});

document.getElementById('subquiz').addEventListener('click', () => {
  let score = 0;
  answers.forEach((answer) => {
    if (answer === true) {
      score++;
    }
  });
  localStorage.setItem('grade', questions.length);
  localStorage.setItem('score', score);
  window.location.replace('./Score.html');
});

function showquestions() {
  const existingButton = document.getElementById(`question-button-${currentIndex}`);

  if (!existingButton) {
    const newButton = document.createElement('button');
    const buttonIndex = currentIndex; // Store the current index in a separate variable

    newButton.id = `question-button-${buttonIndex}`;
    newButton.className = "w-[235px] py-[6px] mx-auto text-center bg-slate-300 text-slate-600 mt-[12px] rounded-xl font-bold hover:bg-sky-500 hover:text-[#ffffff]";
    newButton.textContent = `Question ${buttonIndex + 1}`;

    newButton.addEventListener('click', () => {
       loadQuestion(buttonIndex);
  });
    questionNumber.appendChild(newButton);
    
  } else {
    // Toggle the display of the existing button
    if (existingButton.style.display === 'none') {
      existingButton.style.display = 'block';
    } else {
      existingButton.style.display = 'none';
    }
  }
}

fetchQuestions();



setTimeout(() => {
    document.getElementById("delayedText").classList.remove("hidden");
  }, 5000);








// const fullPath = 'A:/work/Full_Stack/Exam_Project/Images/1726360770958-wallpaperflare.com_wallpaper (4).jpg';

// const fileName = fullPath.split('\\').pop().split('/').pop();

// console.log('File name:', fileName);