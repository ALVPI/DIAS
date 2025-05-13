async function enviarPrompt() {
  const respuestaDiv = document.getElementById('respuesta');
  const promptInput = document.getElementById('prompt');
  const prompt = promptInput.value.trim();

  if (!prompt) {
    respuestaDiv.textContent = "⚠️ Por favor, escribe un mensaje.";
    return;
  }

  respuestaDiv.textContent = 'Cargando...';

  // 🔒 IMPORTANTE: Si esto es público, usa un backend para proteger tu API Key.
  const apiKey = "sk-30fe2479660c4df0b6a30b77a813ef12"; // Reemplaza con tu API Key real
  const API_URL = "https://api.deepseek.com/v1/chat/completions"; // Endpoint de DeepSeek

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat", // Modelo de DeepSeek
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150, // Opcional: limita la respuesta
      }),
    });

    const data = await response.json();

    if (data.choices?.[0]?.message?.content) {
      respuestaDiv.textContent = data.choices[0].message.content;
    } else if (data.error?.message) {
      respuestaDiv.textContent = "⚠️ Error: " + data.error.message;
    } else {
      respuestaDiv.textContent = "⚠️ Respuesta inesperada de la API.";
    }
  } catch (error) {
    respuestaDiv.textContent = "❌ Error al conectar con la API.";
    console.error("Error:", error);
  }
}

// Enviar con Enter (Shift+Enter para salto de línea)
document.getElementById('prompt').addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    enviarPrompt();
  }
});

// Modo oscuro/claro (opcional)
document.getElementById('toggle-mode').addEventListener('click', function () {
  document.body.classList.toggle('dark');
  this.textContent = document.body.classList.contains('dark') ? '☀️ Modo claro' : '🌙 Modo oscuro';
});