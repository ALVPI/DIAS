// ⚠️ Reemplaza esto con tu clave codificada en Base64
const encodedKey = "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"; // Ejemplo ficticio

const promptInput = document.getElementById("prompt");
const respuestaDiv = document.getElementById("respuesta");

async function enviarPrompt() {
  const prompt = promptInput.value.trim();

  if (!prompt) {
    respuestaDiv.textContent = "⚠️ Por favor, escribe un prompt.";
    return;
  }

  respuestaDiv.textContent = "⏳ Consultando ChatGPT...";

  try {
    const apiKey = atob(encodedKey); // Decodifica la clave en tiempo real

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (data.choices?.[0]?.message?.content) {
      respuestaDiv.textContent = data.choices[0].message.content;
    } else {
      respuestaDiv.textContent = "⚠️ Error: " + (data.error?.message || "Respuesta no válida.");
      console.error("Respuesta API:", data);
    }
  } catch (err) {
    respuestaDiv.textContent = "❌ Error al conectar con la API de OpenAI.";
    console.error(err);
  }
}

// Enviar con Enter
promptInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    enviarPrompt();
  }
});

// Alternar modo oscuro
document.getElementById("toggle-mode").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
