
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Root route for basic server test
app.get("/", (req, res) => {
  res.send("✅ LatsoZone backend is running!");
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.get("/generate", async (req, res) => {
  const { topik, jumlah } = req.query;
  const prompt = `Buatkan ${jumlah} soal latihan untuk topik ${topik}. Soalnya dalam format JSON. Setiap soal punya 'pertanyaan', 'jenis' ('pg' atau 'isian'), dan jika pg, sertakan 'pilihan' sebagai array.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const rawText = completion.choices[0].message.content;

    let soal = [];
    try {
      soal = JSON.parse(rawText);
    } catch (err) {
      const match = rawText.match(/```json\n([\s\S]*?)```/);
      if (match) {
        soal = JSON.parse(match[1]);
      } else {
        return res.status(500).json({
          error: "Gagal mem-parse JSON dari AI",
          rawResponse: rawText,
          message: err.message,
        });
      }
    }

    res.json({ soal });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/periksa", async (req, res) => {
  const { jawaban } = req.body;
  const prompt = `Berikut ini adalah jawaban siswa: ${JSON.stringify(jawaban)}. Koreksi dan beri feedback singkat.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ result: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("✅ LatsoZone backend berjalan di port 3000"));
