
const backendURL = "https://79bb9af1-11df-42a6-8be2-c91fa6e48bfd-00-3jt8gyhqqrn8r.pike.replit.dev";

async function generateSoal() {
  const topic = document.getElementById("topic").value;
  const jumlah = document.getElementById("jumlah").value;

  const response = await fetch(`${backendURL}/generate?topik=${topic}&jumlah=${jumlah}`);
  const data = await response.json();

  const container = document.getElementById("soal-container");
  container.innerHTML = "";

  data.soal.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "soal-item";
    div.innerHTML = `
      <p>${index + 1}. ${item.pertanyaan}</p>
      ${item.jenis === "pg" ? item.pilihan.map((p, i) => `
        <label><input type="radio" name="soal${index}" value="${p}"> ${p}</label><br>`).join("") :
        `<input type="text" id="soal${index}">`}
    `;
    container.appendChild(div);
  });
}

async function kirimJawaban() {
  const soalDivs = document.querySelectorAll(".soal-item");
  const jawaban = [];

  soalDivs.forEach((div, index) => {
    const radio = div.querySelector("input[type='radio']:checked");
    const text = div.querySelector("input[type='text']");
    jawaban.push(radio ? radio.value : (text ? text.value : ""));
  });

  const response = await fetch(`${backendURL}/periksa`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jawaban })
  });

  const data = await response.json();
  document.getElementById("hasil").innerText = data.result || "Jawaban dikoreksi.";
}
