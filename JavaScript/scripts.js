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

    } else if (modelo === "huggingface") {
      // Llama al backend Hugging Face para generar una imagen
      const res = await fetch("http://localhost:5002/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();
      if (data.image) {
        const img = document.createElement("img");
        img.src = `data:image/png;base64,${data.image}`;
        img.alt = "Imagen generada";
        img.style.maxWidth = "100%";
        respuestaDiv.innerHTML = "";
        respuestaDiv.appendChild(img);
      } else {
        respuestaDiv.textContent = "❌ No se pudo generar la imagen.";
      }
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
