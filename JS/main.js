async function sendMessage() {
    const inputField = document.getElementById("user-input");
    const message = inputField.value.trim();
  
    if (!message) return;
  
    appendMessage("Usuario", message);
    inputField.value = "";
  
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer TU_API_KEY_AQUI",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: message }],
        }),
      });
  
      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content;
      appendMessage("Asistente", reply);
    } catch (error) {
      console.error("Error al obtener la respuesta:", error);
      appendMessage("Asistente", "Ocurrió un error al procesar tu mensaje.");
    }
  }
  
  function appendMessage(sender, message) {
    const chatLog = document.getElementById("chat-log");
    const messageElement = document.createElement("div");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatLog.appendChild(messageElement);
    chatLog.scrollTop = chatLog.scrollHeight;
  }
  