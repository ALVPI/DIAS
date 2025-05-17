from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import base64

app = Flask(__name__)
CORS(app)

@app.route("/api/minigpt", methods=["POST"])
def usar_minigpt4():
    data = request.json
    prompt = data.get("prompt", "")
    image_b64 = data.get("image", "")

    if not prompt:
        return jsonify({"error": "Falta el prompt"}), 400

    try:
        if image_b64:
            # Si hay imagen, la enviamos junto al prompt
            image_bytes = base64.b64decode(image_b64)
            files = {"image": ("image.png", image_bytes, "image/png")}
            payload = {"prompt": prompt}
            res = requests.post(
                "https://camenduru-minigpt4.hf.space/api/predict",
                files=files,
                data=payload
            )
        else:
            # Solo prompt, sin imagen
            payload = {"prompt": prompt}
            res = requests.post(
                "https://camenduru-minigpt4.hf.space/api/predict",
                data=payload
            )
            print("STATUS:", res.status_code)
            print("RESPUESTA:", res.text)  # <-- Añade esto
        respuesta = res.json()
        return jsonify(respuesta)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5003)
