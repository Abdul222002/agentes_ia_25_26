# ✅ Checklist del Proyecto — Generador de Preguntas con Ollama

## 🎬 Parte 1: Configuración inicial del proyecto

### 🏗 1.1 Inicialización del proyecto
- [ ] Crear carpeta del proyecto  
- [ ] Inicializar repositorio Git  
- [ ] Crear rama de trabajo para desarrollo  

### 📦 1.2 Backend - Instalación de dependencias
- [ ] Completar los datos del package.json (nombre, descripción, autor)  
- [ ] Instalar dependencias: express, dotenv, better-sqlite3, cors  
- [ ] Instalar dependencia de desarrollo: nodemon  
- [ ] Entender para qué sirve cada paquete  

### ⚙ 1.3 Configuración de package.json (backend)
- [ ] Añadir tipo de módulo (ES Modules)  
- [ ] Configurar scripts de desarrollo y ejecución  

### 🔧 1.4 Archivos de configuración
- [ ] Crear archivos .env, .env.example y .gitignore  

### 🖥️ 1.5 Frontend - Estructura básica
- [ ] Crear carpeta frontend  
- [ ] Crear index.html con estructura básica y div principal  
- [ ] Enlazar style.css y main.js  
- [ ] Crear archivos vacíos style.css y main.js  

### 🗄️ 1.6 Base de datos SQLite3
- [ ] Crear carpeta backend/db  
- [ ] No crear manualmente preguntas.db  
- [ ] Asegurarse de que el script la genere automáticamente  

---

## 💻 Parte 2: Backend - Implementación

### 🧱 2.1 backend/db.js
- [ ] Inicializar base de datos con better-sqlite3  
- [ ] Crear tablas necesarias  

### 📝 2.2 backend/prompts.js
- [ ] Definir al menos tres temas  
- [ ] Cada tema debe tener: id, nombre, descripción y prompt  
- [ ] Incluir placeholders para número de preguntas y subtema  

### ⚙ 2.3 backend/services.js
- [ ] Crear función para generar preguntas usando Ollama  
- [ ] Crear función para obtener preguntas de un tema  
- [ ] Crear función para eliminar una pregunta  
- [ ] Crear función para limpiar preguntas por tema  
- [ ] Implementar validaciones y manejo de errores (timeouts, rangos, temas válidos)  

### 🌐 2.4 backend/routes.js
- [ ] Crear router con endpoints:
  - [ ] POST /api/generate  
  - [ ] GET /api/preguntas  
  - [ ] GET /api/preguntas/:id  
  - [ ] DELETE /api/preguntas/:id  
  - [ ] DELETE /api/preguntas/tema/:tema  
  - [ ] GET /api/temas  
  - [ ] GET /api/health  
- [ ] Validar entrada y manejar errores con try/catch  
- [ ] Devolver JSON estructurado con códigos HTTP adecuados  

### 🖥️ 2.5 backend/server.js
- [ ] Cargar configuración del entorno  
- [ ] Configurar Express y CORS  
- [ ] Montar las rutas en /api  
- [ ] Servir archivos del frontend  
- [ ] Escuchar en el puerto configurado  
- [ ] Mostrar mensaje en consola al iniciar  

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
- [ ] Crear archivo para probar los endpoints  
- [ ] Incluir ejemplos para todas las rutas principales  

### ✅ 4.2 Checklist de pruebas manuales
- [ ] Backend levanta sin errores  
- [ ] Ollama responde correctamente  
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
- [ ] Crear archivo para orquestar servicios  

### 🚀 5.2 Levantar con Docker Compose
- [ ] Ejecutar comando para construir y levantar  
- [ ] Verificar que backend y Ollama funcionan  
- [ ] Parar servicios correctamente  

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