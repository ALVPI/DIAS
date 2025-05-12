// server.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');
const path = require('path');

// Cargar variables de entorno desde .env
dotenv.config();

// Configurar la API de OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta de la API para manejar los mensajes
app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', // o "gpt-4" si tienes acceso
            messages: [
                { role: 'system', content: 'Eres un asistente útil y amable.' },
                { role: 'user', content: userMessage },
            ],
        });

        const botResponse = completion.choices[0].message.content;
        res.json({ response: botResponse });
    } catch (error) {
        console.error('Error al llamar a la API de OpenAI:', error);
        res.status(500).json({ error: 'Error al procesar la solicitud.' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
