# DIAS

## Grupo 4

Frontend para un wrapped a Ollama que permitirá realizar consultas texto a texto.

> **Disclaimer**: El código de la rama `Aplicacion` está diseñado para ejecutarse exclusivamente en local, con I/O de texto plano y no está optimizado para entornos de producción.

## Instalación de Ollama y el Modelo Mistral

Este repositorio proporciona instrucciones detalladas para instalar Ollama y el modelo Mistral en diferentes sistemas operativos.

### Tabla de Contenidos

- [En Windows](#en-windows)
- [En Linux](#en-linux)
- [En macOS](#en-macos)

### En Windows

Para instalar Ollama y el modelo Mistral en Windows, sigue estos pasos:

```bash
# Instalar Ollama
winget install Ollama.Ollama

# Verificar la instalación
ollama version

# Descargar el modelo Mistral
ollama pull mistral
```

### En Linux

Para instalar Ollama y el modelo Mistral en Linux, sigue estos pasos:

```bash
# Instalar Ollama
curl -sSL https://ollama.com/install.sh | sh

# Verificar la instalación
ollama version

# Descargar el modelo Mistral
ollama pull mistral
```

### En macOS

Para instalar Ollama y el modelo Mistral en macOS, sigue estos pasos:

```bash
# Instalar Ollama
brew install ollama

# Verificar la instalación
ollama version

# Descargar el modelo Mistral
ollama pull mistral
```

## Ejecución de la Aplicación

Una vez tengas instalado Ollama y el modelo Mistral siguiendo las instrucciones anteriores, sigue estos pasos para ejecutar el frontend de este repositorio:

1. **Clona este repositorio (si no lo has hecho):**
   ```bash
   git clone https://github.com/ALVPI/DIAS.git
   cd DIAS
   ```

2. **Asegúrate de estar en la rama correcta:**
   > El código funcional se encuentra en la rama `Aplicacion`.
   ```bash
   git checkout Aplicacion
   ```
3. **Ejecuta el script correspondiente a su OS:**
   ## Ejecución del script según tu sistema operativo

- **En Windows:**  
  Ejecuta el archivo `.bat` desde la consola:
  ```bash
  ./DIASG4.bat
  ```

- **En Linux o macOS:**  
  Dale permisos de ejecución al archivo `.sh`  y ejecútalo:
  ```bash
  chmod +x nombre_del_script.sh
  ./DIASG4.sh
  ```
4. **Realiza las consultas mediante la aplicación:**
    El tiempo de espera para una consulta oscila entre los 25-40 segundos en función de cuan específica ha de ser la respuesta a la misma.

5. **Cierre el navegador y vuelva a la terminal/interprete de comandos desde donde ha lanzado el script. Presione enter para que el mismo se encargue de matar todos los daemos necesarios para la ejecución del código.**



