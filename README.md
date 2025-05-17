# DIAS

## Grupo 4

Frontend para un wrapped a ChatGPT que permitirá realizar consultas e imágenes.

> **Disclaimer**: El código de la rama `Frontend` está diseñado para ejecutarse exclusivamente en local, con I/O de texto plano y no está optimizado para entornos de producción.

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
