const promptInput = document.getElementById("prompt");
const respuestaDiv = document.getElementById("respuesta");
const modeloSelect = document.getElementById("modelo");

async function enviarPrompt() {
  const prompt = promptInput.value.trim();
  const modelo = modeloSelect.value;

  if (!prompt) {
    respuestaDiv.textContent = "⚠️ Escribe un prompt.";
    return;
  }

  respuestaDiv.textContent = "⏳ Esperando respuesta...";

 
  if (modelo === "ollama") {
    const res = await fetch("http://localhost:5001/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    respuestaDiv.textContent = data.response || "❌ Sin respuesta de Ollama.";
  }    

   
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
  // Guarda la preferencia en localStorage
  localStorage.setItem("modoOscuro", document.body.classList.contains("dark"));
});

// Al cargar la página, aplica la preferencia guardada
if (localStorage.getItem("modoOscuro") === "true") {
  document.body.classList.add("dark");
}
