async function enviarPrompt() {
  const prompt = document.getElementById("prompt").value.trim();
  const respuestaDiv = document.getElementById("respuesta");
  respuestaDiv.textContent = "Cargando...";

  const apiKey = "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";  // ← Pega aquí tu API key real

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "https://tupagina.github.io",  // opcional
        "X-Title": "Demo Chat IA"                      // opcional
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-prover-v2:free",
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await res.json();

    if (data.choices?.[0]?.message?.content) {
      respuestaDiv.textContent = data.choices[0].message.content;
    } else if (data.error?.message) {
      respuestaDiv.textContent = "⚠️ Error: " + data.error.message;
      console.error(data);
    } else {
      respuestaDiv.textContent = "⚠️ Error desconocido.";
      console.error(data);
    }

  } catch (err) {
    respuestaDiv.textContent = "❌ Error al conectar con OpenRouter.";
    console.error(err);
  }
}
