require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/report', async (req, res) => {
  const { message, reason } = req.body;

  const prompt = `
המשתמש מדווח על הודעה בצ'אט. האם היא פוגענית?

הודעה:
"${message}"

הסבר המשתמש:
"${reason}"

ענה רק: פוגעני / לא פוגעני / לא בטוח.
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0
    })
  });

  const data = await response.json();
  const result = data.choices[0].message.content.trim();

  res.json({ result });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Running on port", PORT);
});