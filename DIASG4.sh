#!/bin/bash

echo "✅ Iniciando modelo Mistral con Ollama..."
# Ejecuta el modelo en segundo plano
ollama run mistral &

# Espera 2 segundos para que Ollama arranque
sleep 2

echo "✅ Iniciando backend Flask (app.py)..."
# Ejecuta el backend
cd Backend
python3 ollamaLocal.py &

# Espera 3 segundos para que Flask inicie correctamente
sleep 3

# Abre el navegador con el archivo index.html
echo "✅ Abriendo navegador con index.html..."
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open ../index.html
elif [[ "$OSTYPE" == "darwin"* ]]; then
    open ../index.html
elif [[ "$OSTYPE" == "cygwin" || "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    start ../index.html
else
    echo "⚠️ No se pudo detectar el sistema operativo automáticamente. Abre index.html manualmente."
fi