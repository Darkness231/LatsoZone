// script.js
fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    showQuestion(data.questions[0]); // untuk sementara tampilkan soal pertama
  });

function showQuestion(questionData) {
  const main = document.querySelector('main');
  main.innerHTML = `
    <div class="question">
      <p><strong>${questionData.question}</strong></p>
      ${questionData.type === "multiple_choice"
        ? questionData.options.map(opt => 
          `<div class="answer" onclick="checkAnswer(this, '${opt}', '${questionData.answer}')">${opt}</div>`).join('')
        : `<input type="text" id="shortAnswer" placeholder="Ketik jawaban..." style="width:100%; padding:8px; border-radius:5px; border:1px solid #ccc;">`
      }
    </div>
    <button onclick="nextQuestion()">Soal Selanjutnya</button>
  `;

  if (questionData.type === "short_answer") {
    const button = document.querySelector("button");
    button.onclick = () => {
      const userAnswer = document.getElementById("shortAnswer").value.trim();
      if (userAnswer.toLowerCase() === questionData.answer.toLowerCase()) {
        alert("Jawaban kamu benar!");
      } else {
        alert("Jawaban kamu salah!");
      }
    };
  }
}

function checkAnswer(el, selected, correct) {
  const answers = el.parentNode.querySelectorAll('.answer');
  answers.forEach(a => a.onclick = null);
  if (selected === correct) {
    el.classList.add('correct');
    alert('Jawaban kamu benar!');
  } else {
    el.classList.add('wrong');
    alert('Jawaban kamu salah!');
  }
}

function nextQuestion() {
  alert("Soal selanjutnya dalam pengembangan yaa, sabar ya sayang 😘");
}
