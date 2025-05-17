#!/bin/bash

echo "✅ Iniciando el backend Python (fichero.py)..."
# Cambia al directorio del backend y ejecuta el archivo Python en segundo plano
cd Backend
python3 MiniGPT4.py &

echo "✅ Abriendo index.html en el navegador predeterminado..."
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