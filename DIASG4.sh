#!/bin/bash

echo "✅ Iniciando modelo Mistral con Ollama..."
# Lanza Ollama solo si no está corriendo
if ! pgrep -f "ollama run mistral" > /dev/null; then
    ollama run mistral &
    OLLAMA_PID=$!
    echo "PID de Ollama: $OLLAMA_PID"
else
    echo "Ollama ya está corriendo."
    OLLAMA_PID=$(pgrep -f "ollama run mistral")
fi

sleep 2

echo "✅ Iniciando backend Flask (app.py)..."
cd Backend
python3 ollamaLocal.py &
FLASK_PID=$!
cd ..

sleep 3

echo "✅ Abriendo navegador con index.html..."
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open index.html
elif [[ "$OSTYPE" == "darwin"* ]]; then
    open index.html
elif [[ "$OSTYPE" == "cygwin" || "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    start index.html
else
    echo "⚠️ No se pudo detectar el sistema operativo automáticamente. Abre index.html manualmente."
fi

echo "⏳ Esperando a que cierres el navegador (pulsa Enter aquí cuando lo hayas cerrado)..."
read

echo "🛑 Cerrando servicios..."



# Detener Ollama
if [[ ! -z "$OLLAMA_PID" ]]; then
    kill "$OLLAMA_PID"
    echo "Ollama detenido."
fi

# Detener Flask
if [[ ! -z "$FLASK_PID" ]]; then
    kill "$FLASK_PID"
    echo "Flask detenido."
fi

echo "✅ Todo detenido correctamente."