const promptInput = document.getElementById("prompt");
const respuestaDiv = document.getElementById("respuesta");

// Función principal: hace la petición a Ollama en local
async function enviarPrompt() {
  const prompt = document.getElementById("prompt").value.trim();
  const respuestaDiv = document.getElementById("respuesta");

  if (!prompt) {
    respuestaDiv.textContent = "⚠️ Escribe algo antes de enviar.";
    return;
  }

  respuestaDiv.textContent = "⏳ Generando respuesta...";

  try {
    const response = await fetch("http://localhost:5001/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    respuestaDiv.textContent = data.response || "❌ Respuesta vacía.";

  } catch (err) {
    console.error(err);
    respuestaDiv.textContent = "❌ Error al conectar con el backend.";
  }
}

// ⌨️ Envío con Enter (sin perder Shift+Enter)
promptInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    enviarPrompt();
  }
});

// 🖱️ Envío con botón
document.getElementById("enviar-btn").addEventListener("click", enviarPrompt);

// 🌙 Alternar modo oscuro
document.getElementById("toggle-mode").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
