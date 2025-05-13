
async function enviarPrompt() {
  const prompt = document.getElementById("prompt").value;
  const respuestaDiv = document.getElementById("respuesta");
  respuestaDiv.textContent = "Cargando...";

  // API key codificada (base64)
  const encodedKey = "c2stcHJvai1Ya0VicVo1VnRXOV80WU90c0lhT1JSU3FrMFhaNkxfTldnZ2dZZkh0aVRyUFpXSXN6ZU14dWxKYjRjNkkxWm5XMjlUSXN3a1lMSVQzQmxia0ZKQmpBSWx6RGd2Yk5Ca2NYRWt6MVhhaHRPRFpOMkR3c2RFOUZKdWoyWkd2WjdLU0k2MWVBQkRhdEduRDZJZGxLcHJYci1WTjJ4OEE=";  // <-- pon aquí tu clave codificada
  const apiKey = atob(encodedKey); // decodifica a texto plano

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: prompt }
      ]
    })
  });

  const data = await response.json();

  if (data.choices?.[0]?.message?.content) {
    respuestaDiv.textContent = data.choices[0].message.content;
  } else {
    respuestaDiv.textContent = "⚠️ Error: " + (data.error?.message || "Respuesta vacía");
    console.error(data);
  }
}