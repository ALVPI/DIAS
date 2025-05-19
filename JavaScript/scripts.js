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

  try {
    if (modelo === "ollama") {
      const res = await fetch("http://localhost:5001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      respuestaDiv.textContent = data.response || "❌ Sin respuesta de Ollama.";
    } else if (modelo === "minigpt") {
      const fileInput = document.getElementById("image");
      if (!fileInput || !fileInput.files.length) {
        respuestaDiv.textContent = "⚠️ MiniGPT requiere una imagen.";
        return;
      }

      const reader = new FileReader();
      reader.onload = async function () {
        const base64Image = reader.result.split(",")[1];

        const res = await fetch("http://localhost:5003/api/minigpt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, image: base64Image })
        });

        const data = await res.json();
        respuestaDiv.textContent = data?.data?.[0]?.generated_text || "❌ Sin respuesta de MiniGPT.";
      };
      reader.readAsDataURL(fileInput.files[0]);
      return; // salimos para no limpiar el campo aún
    }

    promptInput.value = "";

  } catch (err) {
    console.error(err);
    respuestaDiv.textContent = "❌ Error al conectar con el modelo.";
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
