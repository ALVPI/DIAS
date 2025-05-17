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

  respuestaDiv.textContent = "⏳ Generando respuesta...";

  try {
    if (modelo === "ollama") {
      // Llama al backend local que usa Ollama
      const res = await fetch("http://localhost:5001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();
      respuestaDiv.textContent = data.response || "❌ Sin respuesta válida de Ollama.";

    } else if (modelo === "minigpt") {
      const imagenInput = document.getElementById("imagen");
      if (!imagenInput.files[0]) {
        respuestaDiv.textContent = "⚠️ Sube una imagen.";
        return;
      }
      // Leer imagen como base64
      const reader = new FileReader();
      reader.onload = async function(e) {
        const imageB64 = e.target.result.split(",")[1];
        const res = await fetch("http://localhost:5003/api/minigpt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, image: imageB64 })
        });
        const data = await res.json();
        respuestaDiv.textContent = data.response || JSON.stringify(data);
      };
      reader.readAsDataURL(imagenInput.files[0]);
      return; // Salir para evitar limpiar el prompt antes de tiempo
    }

    // Limpia el prompt tras generar respuesta
    promptInput.value = "";

  } catch (err) {
    console.error(err);
    respuestaDiv.textContent = "❌ Error al conectar con el backend.";
  }
}


// 🖱️ Envío con botón
document.getElementById("enviar-btn").addEventListener("click", enviarPrompt);

// 🌙 Alternar modo oscuro
document.getElementById("toggle-mode").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
