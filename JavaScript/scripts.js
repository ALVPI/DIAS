// ⚠️ Reemplaza esto con tu clave codificada en Base64
const encodedKey = "c2stcHJvai1Ya0VicVo1VnRXOV80WU90c0lhT1JSU3FrMFhaNkxfTldnZ2dZZkh0aVRyUFpXSXN6ZU14dWxKYjRjNkkxWm5XMjlUSXN3a1lMSVQzQmxia0ZKQmpBSWx6RGd2Yk5Ca2NYRWt6MVhhaHRPRFpOMkR3c2RFOUZKdWoyWkd2WjdLU0k2MWVBQkRhdEduRDZJZGxLcHJYci1WTjJ4OEE="; // Ejemplo ficticio

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
document.getElementById("enviar-btn").addEventListener("click", enviarPrompt);
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
