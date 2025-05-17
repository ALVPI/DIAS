#!/bin/bash

echo "✅ Iniciando modelo Mistral con Ollama..."
# Ejecuta el modelo en segundo plano
ollama run mistral &

# Espera 2 segundos para que Ollama arranque
sleep 2

echo "✅ Iniciando backend Flask (app.py)..."
# Ejecuta el backend
cd Backend
python3 ollamaLocal.py
