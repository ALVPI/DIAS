require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
const port = process.env.PORT || 10000;

// Middleware
app.use(cors()); // Permitir solicitudes del frontend (GitHub Pages)
app.use(express.json()); // Asegurarse de que las solicitudes estén en formato JSON

// Inicialización de OpenAI con la clave de API desde las variables de entorno
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Ruta para procesar el mensaje y obtener la respuesta de OpenAI
app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    // Realizar la llamada a la API de OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }]
    });

    const reply = completion.choices[0].message.content;

    // Responder con la respuesta generada
    res.json({ reply });
  } catch (error) {
    console.error('Error al contactar con OpenAI:', error.message);
    res.status(500).json({ error: "Error al contactar con OpenAI" });
  }
});

// Hacer que el servidor escuche en el puerto 10000 o el puerto asignado por Render
app.listen(process.env.PORT || 10000, '0.0.0.0', () => {
  console.log('Servidor backend escuchando en http://localhost:10000');
});
