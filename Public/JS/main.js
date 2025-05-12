const API_KEY = 'YOUR_OPENAI_API_KEY'; // Replace with your actual API key

// Función para cambiar entre el modo claro y oscuro
document.getElementById('toggle-mode').addEventListener('click', function(event) {
    document.body.classList.toggle('dark-mode');
    this.textContent = document.body.classList.contains('dark-mode') ? 'Modo Claro' : 'Modo Oscuro';
    event.stopPropagation(); // Evita que el evento de clic se propague
});

// Función para enviar el mensaje del usuario
document.getElementById('send-button').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput) {
        sendMessage(userInput);
        document.getElementById('user-input').value = '';
    }
});

// Evento para enviar el mensaje al pulsar Enter
document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const userInput = document.getElementById('user-input').value.trim();
        if (userInput) {
            sendMessage(userInput);
            document.getElementById('user-input').value = '';
        }
        event.preventDefault(); // Evita que se envíe el formulario
    }
});

// Función para enviar el mensaje del usuario y mostrar el indicador de escritura
async function sendMessage(message) {
    const chatMessages = document.getElementById('chat-messages');
    const userMessageElement = document.createElement('div');
    userMessageElement.classList.add('message', 'user-message');
    userMessageElement.textContent = message;
    chatMessages.appendChild(userMessageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    showTypingIndicator();

    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: message,
                max_tokens: 2048,
                temperature: 0.5
            })
        });

        const data = await response.json();
        const botMessage = data.choices[0].text.trim();

        hideTypingIndicator();
        receiveMessage(botMessage);
    } catch (error) {
        console.error('Error:', error);
        hideTypingIndicator();
        receiveMessage('Lo siento, no pude procesar tu solicitud.');
    }
}

// Función para mostrar el indicador de escritura
function showTypingIndicator() {
    document.getElementById('typing-indicator').style.display = 'flex';
}

// Función para ocultar el indicador de escritura
function hideTypingIndicator() {
    document.getElementById('typing-indicator').style.display = 'none';
}

// Función para recibir la respuesta del bot
function receiveMessage(message) {
    const chatMessages = document.getElementById('chat-messages');
    const botMessageElement = document.createElement('div');
    botMessageElement.classList.add('message', 'bot-message');
    botMessageElement.textContent = message;
    chatMessages.appendChild(botMessageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
