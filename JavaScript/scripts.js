const apiKey = "c932a3cd19bcef4fa6e443817b9e5d3e80cfbaf729af491880a0bc6c423b6fce"; // <-- pega aquí tu clave de https://together.ai/settings/api-keys
const promptInput = document.getElementById("prompt");
const respuestaDiv = document.getElementById("respuesta");

async function enviarPrompt() {
  const prompt = promptInput.value.trim();
  if (!prompt) {
    respuestaDiv.textContent = "⚠️ Por favor, escribe un prompt antes de enviar.";
    return;
  }

  respuestaDiv.textContent = "⏳ Generando respuesta...";

  try {
    const response = await fetch("https://api.together.xyz/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();

    if (data.choices?.[0]?.message?.content) {
      respuestaDiv.textContent = data.choices[0].message.content;
    } else {
      respuestaDiv.textContent = "⚠️ Error: " + (data.error?.message || "Respuesta vacía.");
      console.error(data);
    }
  } catch (err) {
    console.error(err);
    respuestaDiv.textContent = "❌ Error al conectar con la API.";
  }
}

// Enviar con Enter
promptInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    enviarPrompt();
  }
});

// Botón de envío
document.getElementById("enviar-btn").addEventListener("click", enviarPrompt);

// Modo oscuro
document.getElementById("toggle-mode").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
