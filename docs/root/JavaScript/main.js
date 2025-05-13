const BACKEND_URL = 'https://dias-backend.onrender.com/chat'; // URL pública de tu backend

// Modo claro/oscuro
document.getElementById('toggle-mode').addEventListener('click', function(event) {
    document.body.classList.toggle('dark-mode');
    this.textContent = document.body.classList.contains('dark-mode') ? 'Modo Claro' : 'Modo Oscuro';
    event.stopPropagation(); // Evita que el evento de clic se propague
});

// Enviar mensaje con botón
document.getElementById('send-button').addEventListener('click', async () => {
    const input = document.getElementById('user-input');
    const userInput = input.value.trim();
    if (userInput) {
        sendMessage(userInput);
        input.value = '';
    }
});

// Enviar con Enter
document.getElementById('user-input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const input = document.getElementById('user-input');
        const userInput = input.value.trim();
        if (userInput) {
            sendMessage(userInput);
            input.value = '';
        }
        event.preventDefault(); // Evita que se envíe el formulario
    }
});

async function sendMessage(message) {
    const chatMessages = document.getElementById('chat-messages');
    
    // Muestra el mensaje del usuario
    const userMessageElement = document.createElement('div');
    userMessageElement.classList.add('message', 'user-message');
    userMessageElement.textContent = message;
    chatMessages.appendChild(userMessageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    showTypingIndicator();

    try {
        // Hacer la solicitud al backend
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        hideTypingIndicator();

        if (data.reply) {
            receiveMessage(data.reply);
        } else {
            receiveMessage('Lo siento, no he podido responder.');
        }
    } catch (error) {
        console.error('Error al contactar con el servidor:', error);
        hideTypingIndicator();
        receiveMessage('Ha ocurrido un error. Inténtalo más tarde.');
    }
}

function showTypingIndicator() {
    document.getElementById('typing-indicator').style.display = 'flex';
}

function hideTypingIndicator() {
    document.getElementById('typing-indicator').style.display = 'none';
}

function receiveMessage(message) {
    const chatMessages = document.getElementById('chat-messages');
    const botMessageElement = document.createElement('div');
    botMessageElement.classList.add('message', 'bot-message');
    botMessageElement.textContent = message;
    chatMessages.appendChild(botMessageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
