document.getElementById("enviar-btn").addEventListener("click", async () => {
  const prompt = document.getElementById("prompt").value.trim();
  const modelo = document.getElementById("modelo").value;

  if (!prompt) {
    alert("Introduce un prompt");
    return;
  }

  if (modelo === "ollama") {
    await llamarOllama(prompt);
  } else if (modelo === "minigpt") {
    await llamarMiniGPT(prompt);
  } else if (modelo === "huggingface-dalle") {
    await generarImagenConBackend(prompt);
  }
});

async function generarImagenConBackend(prompt) {
  const respuesta = document.getElementById("respuesta");
  respuesta.innerHTML = "Generando imagen desde Hugging Face...";

  try {
    const res = await fetch("http://localhost:8001/api/generar-imagen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) throw new Error("Error generando la imagen");

    const data = await res.json();
    respuesta.innerHTML = `<img src="${data.url}" alt="Imagen generada" style="max-width: 100%; border-radius: 1rem;">`;
  } catch (error) {
    respuesta.innerText = "Error al generar la imagen: " + error.message;
  }
}

// Las siguientes funciones siguen siendo llamadas si se usa Ollama o MiniGPT
async function llamarOllama(prompt) {
  document.getElementById("respuesta").innerText = "Llamando a Ollama (aún no implementado aquí)";
}

async function llamarMiniGPT(prompt) {
  document.getElementById("respuesta").innerText = "Llamando a MiniGPT4 (aún no implementado aquí)";
}
