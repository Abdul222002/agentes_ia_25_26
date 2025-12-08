# ✅ Checklist del Proyecto — Generador de Preguntas con Ollama

## 🎬 Parte 1: Configuración inicial del proyecto

### 🏗 1.1 Inicialización del proyecto
- [X] Crear carpeta del proyecto  
- [X] Inicializar repositorio Git  
- [X] Crear rama de trabajo para desarrollo  

### 📦 1.2 Backend - Instalación de dependencias
- [X] Completar los datos del package.json (nombre, descripción, autor)  
- [X] Instalar dependencias: express, dotenv, better-sqlite3, cors  
- [X] Instalar dependencia de desarrollo: nodemon  
- [X] Entender para qué sirve cada paquete  

### ⚙ 1.3 Configuración de package.json (backend)

- [X] Añadir tipo de módulo (ES Modules)  
- [X] Configurar scripts de desarrollo y ejecución  

### 🔧 1.4 Archivos de configuración

- [X] Crear archivos .env, .env.example y .gitignore  

### 🖥️ 1.5 Frontend - Estructura básica

- [X] Crear carpeta frontend  
- [X] Crear index.html con estructura básica y div principal  
- [X] Enlazar style.css y main.js  
- [X] Crear archivos vacíos style.css y main.js  
  
### 🗄️ 1.6 Base de datos SQLite3

- [X] Crear carpeta backend/db  
- [X] No crear manualmente preguntas.db  
- [X] Asegurarse de que el script la genere automáticamente  

---

## 💻 Parte 2: Backend - Implementación

### 🧱 2.1 backend/db.js

- [X] Inicializar base de datos con better-sqlite3  
- [X] Crear tablas necesarias  

### 📝 2.2 backend/prompts.js
- [x] Definir al menos tres temas  
- [x] Cada tema debe tener: id, nombre, descripción y prompt  
- [x] Incluir placeholders para número de preguntas y subtema  

### ⚙ 2.3 backend/services.js
- [x] Crear función para generar preguntas usando Ollama  
- [x] Crear función para obtener preguntas de un tema  
- [x] Crear función para eliminar una pregunta  
- [x] Crear función para limpiar preguntas por tema  
- [x] Implementar validaciones y manejo de errores (timeouts, rangos, temas válidos)  

### 🌐 2.4 backend/routes.js
- [X] Crear router con endpoints:
  - [X] POST /api/generate  
  - [X] GET /api/preguntas  
  - [x] GET /api/preguntas/:id  
  - [x] DELETE /api/preguntas/:id  
  - [x] DELETE /api/preguntas/tema/:tema  
  - [x] GET /api/temas  
  - [x] GET /api/health  
- [x] Validar entrada y manejar errores con try/catch  
- [X] Devolver JSON estructurado con códigos HTTP adecuados  

### 🖥️ 2.5 backend/server.js
- [x] Cargar configuración del entorno  
- [X] Configurar Express y CORS  
- [x] Montar las rutas en /api  
- [x] Servir archivos del frontend  
- [x] Escuchar en el puerto configurado  
- [x] Mostrar mensaje en consola al iniciar  

---

## 🎨 Parte 3: Frontend - JavaScript Vanilla

### 🧩 3.1 index.html
- [ ] Incluir título, selector de tema, input de número, botones y contenedor  
- [ ] Añadir indicador de carga  
- [ ] Vincular correctamente los archivos CSS y JS  

### 🎨 3.2 style.css
- [ ] Definir estilos básicos para el cuerpo y contenedor principal  
- [ ] Estilizar selector, inputs y botones  
- [ ] Añadir estilo para tarjetas de preguntas  
- [ ] Incluir estilos para estado de carga y errores  
- [ ] Asegurar diseño responsive  
- [ ] No usar frameworks CSS  

### ⚡ 3.3 main.js
- [ ] Crear función para cargar temas desde la API  
- [ ] Crear función para generar preguntas  
- [ ] Crear función para mostrar preguntas  
- [ ] Crear función para eliminar una pregunta  
- [ ] Crear función para limpiar preguntas del tema  
- [ ] Añadir eventos para botones y validaciones  
- [ ] Implementar manejo de errores y mensajes al usuario  
- [ ] Mostrar y ocultar indicador de carga correctamente  

---

## 🧪 Parte 4: Testing y Validación

### 🧾 4.1 validacion.http
- [X] Crear archivo para probar los endpoints  
- [X] Incluir ejemplos para todas las rutas principales  

### ✅ 4.2 Checklist de pruebas manuales
- [X] Backend levanta sin errores  
- [X] Ollama responde correctamente  
- [ ] Frontend carga sin problemas  
- [ ] Selector de temas funciona  
- [ ] Generar preguntas (JavaScript, Seguridad, Normativa) funciona  
- [ ] Preguntas se guardan en la base de datos  
- [ ] Preguntas se muestran en el frontend  
- [ ] Eliminar pregunta funciona  
- [ ] Limpiar tema funciona  
- [ ] Validaciones bloquean datos incorrectos  
- [ ] Mensajes de error claros si Ollama no responde  
- [ ] Indicador de carga visible y funcional  

---

## 🐳 Parte 5: Dockerización

### 🐋 5.1 docker-compose.yml
- [X] Crear archivo para orquestar servicios  

### 🚀 5.2 Levantar con Docker Compose
- [X] Ejecutar comando para construir y levantar  
- [X] Verificar que backend y Ollama funcionan  
- [X] Parar servicios correctamente  

---

## 📖 Parte 6: Documentación (README.md)

- [ ] Incluir descripción general y propósito del proyecto  
- [ ] Listar requisitos (Node.js, Docker, Ollama, etc.)  
- [ ] Explicar instalación local y con Docker  
- [ ] Explicar estructura de carpetas  
- [ ] Documentar endpoints de la API  
- [ ] Añadir ideas de futuras extensiones  

---

## 🌿 Parte 7: Git y Control de Versiones

- [ ] Hacer commits incrementales y descriptivos  
- [ ] Usar mensajes de commit claros y coherentes  
- [ ] Mantener un flujo de trabajo limpio  
- [ ] Crear Pull Request con resumen y división de tareas 