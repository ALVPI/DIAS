@echo off

echo ✅ Iniciando modelo Mistral con Ollama...
REM Ejecuta el modelo en segundo plano
start /B ollama run mistral

REM Espera 2 segundos para que Ollama arranque
timeout /t 2 > nul

echo ✅ Iniciando backend Flask (app.py)...
REM Cambia al directorio del backend y ejecuta el servidor Flask en segundo plano
cd Backend
start /B python ollamaLocal.py

REM Espera 3 segundos para que Flask inicie correctamente
timeout /t 3 > nul

echo ✅ Abriendo navegador con index.html...
REM Abre el archivo index.html en el navegador predeterminado
start ..\index.html

echo 🎉 Todo listo. El sistema está funcionando.
pause