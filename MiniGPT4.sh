#!/bin/bash

echo "✅ Iniciando el backend Python (fichero.py)..."
# Cambia al directorio del backend y ejecuta el archivo Python en segundo plano
cd Backend
python3 fichero.py &

# Espera 3 segundos para que el backend tenga tiempo de iniciar correctamente
sleep 3

echo "✅ Abriendo index.html en el navegador predeterminado..."
# Abre el archivo index.html en el navegador predeterminado
xdg-open ../index.html

echo "🎉 Todo listo. El sistema está funcionando."