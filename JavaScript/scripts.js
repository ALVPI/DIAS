async function enviarPrompt() {
  const prompt = document.getElementById('prompt').value.trim();
  if (!prompt) return;

  const respuestaDiv = document.getElementById('respuesta');
  respuestaDiv.textContent = 'Cargando...';

  const apiKey = ''; // ⚠️ No poner esto en producción sin proxy seguro

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await res.json();
    const respuesta = data.choices?.[0]?.message?.content || 'Error en la respuesta';
    respuestaDiv.textContent = respuesta;
  } catch (err) {
    respuestaDiv.textContent = 'Error de conexión o clave incorrecta.';
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
