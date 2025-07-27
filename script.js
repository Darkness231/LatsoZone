// 1. Kirim permintaan ke Replit API
fetch('https://79bb9af1-11df-42a6-8be2-c91fa6e48bfd-00-3jt8gyhqqrn8r.pike.replit.dev/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    prompt: "Buatkan 2 soal matematika SMA campuran pilihan ganda dan isian dalam format JSON"
  })
})
.then(res => res.json())
.then(data => {
  const jsonSoal = JSON.parse(data.result); // parsing hasil dari ChatGPT
  console.log("Hasil dari AI:", jsonSoal);

  // Menampilkan soal pertama
  showQuestion(jsonSoal.questions[0]); 
});

// 2. Fungsi tampil soal
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
  alert("Soal berikutnya dalam pengembangan yaa, sabar ya sayang 😘");
}
