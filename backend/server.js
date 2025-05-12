require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Inicializa la API de OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Tu clave de OpenAI desde .env
});

// Ruta para interactuar con la API de OpenAI
app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Usa el modelo más adecuado
      messages: [{ role: "user", content: message }]
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('Error al contactar con OpenAI:', error.message);
    res.status(500).json({ error: "Error al contactar con OpenAI" });
  }
});

// Inicia el servidor
app.listen(10000, '0.0.0.0', () => {
  console.log('Servidor corriendo en http://localhost:10000');
});
app.get('/', (req, res) => {
  res.send('Backend de DIAS está funcionando. Haz peticiones POST a /chat');
});