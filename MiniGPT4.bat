@echo off

echo ✅ Iniciando el backend Python (fichero.py)...
REM Cambia al directorio Backend y ejecuta el fichero.py en segundo plano
cd Backend
start /B python fichero.py

REM Espera 3 segundos para que Flask inicie correctamente
timeout /t 3 > nul

echo ✅ Abriendo navegador con index.html...
REM Abre el archivo index.html en el navegador predeterminado
start ..\index.html

echo 🎉 Todo listo. El sistema está funcionando.
pause