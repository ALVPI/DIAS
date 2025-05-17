@echo off
echo ✅ Iniciando modelo Mistral con Ollama...
start /B ollama run mistral

timeout /T 2 > nul

echo ✅ Iniciando backend Flask (app.py)...
cd Backend
python ollamaLocal.py
