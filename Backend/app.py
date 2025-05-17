from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Permitir peticiones desde tu index.html

OLLAMA_API_URL = "http://localhost:11434/api/generate"

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.json
    prompt = data.get("prompt", "")

    if not prompt:
        return jsonify({ "error": "Prompt vacío" }), 400

    payload = {
        "model": "mistral",
        "prompt": prompt,
        "stream": False
    }

    try:
        ollama_response = requests.post(OLLAMA_API_URL, json=payload)
        return jsonify(ollama_response.json())
    except Exception as e:
        return jsonify({ "error": str(e) }), 500

if __name__ == "__main__":
    app.run(port=5001)
