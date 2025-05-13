async function enviarPrompt() {
  const respuestaDiv = document.getElementById('respuesta');
  respuestaDiv.textContent = 'Cargando...';

  const apiKey = "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"; // Pega aquí tu token

  try {
    await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
      "HTTP-Referer": "https://tupagina.github.io",
      "X-Title": "Wrapped demo"
    },
    body: JSON.stringify({
      model: "opengvlab/internvl3-14b:free",
      messages: [{ role: "user", content: prompt }]
    }),
  });

    const data = await res.json();

    if (data.choices?.[0]?.message?.content) {
      respuestaDiv.textContent = data.choices[0].message.content;
    } else if (data.error?.message) {
      respuestaDiv.textContent = "⚠️ Error: " + data.error.message;
    } else {
      respuestaDiv.textContent = "⚠️ Error desconocido.";
    }

  } catch (error) {
    respuestaDiv.textContent = "❌ Error al conectar con la API.";
    console.error(error);
  }
}

// Enviar con Enter, Shift+Enter para salto de línea
document.getElementById('prompt').addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    enviarPrompt();
  }
});

// Modo oscuro
document.getElementById('toggle-mode').addEventListener('click', function () {
  document.body.classList.toggle('dark');
  this.textContent = document.body.classList.contains('dark') ? '☀️ Modo claro' : '🌙 Modo oscuro';
});
