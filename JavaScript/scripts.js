const promptInput = document.getElementById("prompt");
const respuestaDiv = document.getElementById("respuesta");

async function enviarPrompt() {
  const prompt = promptInput.value.trim();

  if (!prompt) {
    respuestaDiv.textContent = "⚠️ Escribe un prompt.";
    return;
  }

  respuestaDiv.textContent = "⏳ Esperando respuesta...";

  try {
    const res = await fetch("http://localhost:5001/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    respuestaDiv.textContent = data.response || data.error || "❌ Sin respuesta de Ollama.";
  } catch (error) {
    respuestaDiv.textContent = "❌ Error al conectar con Ollama.";
  }
  promptInput.value = "";
}

document.getElementById("enviar-btn").addEventListener("click", enviarPrompt);
promptInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    enviarPrompt();
  }
});

// cambiar a modo oscuro
document.getElementById("toggle-mode").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("modoOscuro", document.body.classList.contains("dark"));
});

// Al cargar la página, aplica la preferencia guardada
if (localStorage.getItem("modoOscuro") === "true") {
  document.body.classList.add("dark");
}
