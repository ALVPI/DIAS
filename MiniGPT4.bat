@echo off

echo ✅ Iniciando el backend Python (fichero.py)...
REM Cambia al directorio Backend y ejecuta el fichero.py en segundo plano
cd Backend
start /B python fichero.py

REM Espera 3 segundos para que el backend pueda iniciar correctamente
timeout /t 3 > nul

echo ✅ Abriendo index.html en el navegador predeterminado...
REM Abre el archivo index.html ubicado en el directorio superior
start ..\index.html

echo 🎉 Todo listo. El sistema está funcionando.
pause