# ✅ Checklist del Proyecto — Generador de Preguntas con Ollama

## 🎬 Parte 1: Configuración inicial del proyecto (Abdul)

### 🏗 1.1 Inicialización del proyecto (Abdul)
- [X] Crear carpeta del proyecto  
- [X] Inicializar repositorio Git  
- [X] Crear rama de trabajo para desarrollo  

### 📦 1.2 Backend - Instalación de dependencias (Abdul)
- [X] Completar los datos del package.json (nombre, descripción, autor)  
- [X] Instalar dependencias: express, dotenv, better-sqlite3, cors  
- [X] Instalar dependencia de desarrollo: nodemon  
- [X] Entender para qué sirve cada paquete  

### ⚙ 1.3 Configuración de package.json (backend) (Abdul)

- [X] Añadir tipo de módulo (ES Modules)  
- [X] Configurar scripts de desarrollo y ejecución  

### 🔧 1.4 Archivos de configuración (Abdul)

- [X] Crear archivos .env, .env.example y .gitignore  

### 🖥️ 1.5 Frontend - Estructura básica (Abdul)

- [X] Crear carpeta frontend  
- [X] Crear index.html con estructura básica y div principal  
- [X] Enlazar style.css y main.js  
- [X] Crear archivos vacíos style.css y main.js  
  
### 🗄️ 1.6 Base de datos SQLite3 (Abdul)

- [X] Crear carpeta backend/db  
- [X] No crear manualmente preguntas.db  
- [X] Asegurarse de que el script la genere automáticamente  

---

## 💻 Parte 2: Backend - Implementación (Abdul)

### 🧱 2.1 backend/db.js (Abdul)

- [X] Inicializar base de datos con better-sqlite3  
- [X] Crear tablas necesarias  

### 📝 2.2 backend/prompts.js (Abdul)
- [x] Definir al menos tres temas  
- [x] Cada tema debe tener: id, nombre, descripción y prompt  
- [x] Incluir placeholders para número de preguntas y subtema  

### ⚙ 2.3 backend/services.js (Abdul)
- [x] Crear función para generar preguntas usando Ollama  
- [x] Crear función para obtener preguntas de un tema  
- [x] Crear función para eliminar una pregunta  
- [x] Crear función para limpiar preguntas por tema  
- [x] Implementar validaciones y manejo de errores (timeouts, rangos, temas válidos)  

### 🌐 2.4 backend/routes.js (Abdul)
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

### 🖥️ 2.5 backend/server.js (Abdul)
- [x] Cargar configuración del entorno  
- [X] Configurar Express y CORS  
- [x] Montar las rutas en /api  
- [x] Servir archivos del frontend  
- [x] Escuchar en el puerto configurado  
- [x] Mostrar mensaje en consola al iniciar  

---

## 🎨 Parte 3: Frontend - JavaScript Vanilla

### 🧩 3.1 index.html
- [x] Incluir título, selector de tema, input de número, botones y contenedor  
- [x] Añadir indicador de carga  
- [x] Vincular correctamente los archivos CSS y JS  

### 🎨 3.2 style.css
- [x] Definir estilos básicos para el cuerpo y contenedor principal  
- [x] Estilizar selector, inputs y botones  
- [x] Añadir estilo para tarjetas de preguntas  
- [x] Incluir estilos para estado de carga y errores  
- [x] Asegurar diseño responsive  
- [x] No usar frameworks CSS  

### ⚡ 3.3 main.js
- [x] Crear función para cargar temas desde la API  
- [x] Crear función para generar preguntas  
- [x] Crear función para mostrar preguntas  
- [x] Crear función para eliminar una pregunta  
- [x] Crear función para limpiar preguntas del tema  
- [x] Añadir eventos para botones y validaciones  
- [x] Implementar manejo de errores y mensajes al usuario  
- [x] Mostrar y ocultar indicador de carga correctamente  

---

## 🧪 Parte 4: Testing y Validación 

### 🧾 4.1 validacion.http (Abdul)
- [X] Crear archivo para probar los endpoints  
- [X] Incluir ejemplos para todas las rutas principales  

### ✅ 4.2 Checklist de pruebas manuales
- [X] Backend levanta sin errores  
- [X] Ollama responde correctamente  
- [x] Frontend carga sin problemas  
- [x] Selector de temas funciona  
- [x] Generar preguntas (JavaScript, Seguridad, Normativa) funciona  
- [ ] Preguntas se guardan en la base de datos  
- [x] Preguntas se muestran en el frontend  
- [x] Eliminar pregunta funciona  
- [x] Limpiar tema funciona  
- [x] Validaciones bloquean datos incorrectos  
- [x] Mensajes de error claros si Ollama no responde  
- [x] Indicador de carga visible y funcional  

---

## 🐳 Parte 5: Dockerización (Juan y Abdul)

### 🐋 5.1 docker-compose.yml
- [x] Crear archivo para orquestar servicios  

### 🚀 5.2 Levantar con Docker Compose
- [X] Ejecutar comando para construir y levantar  
- [X] Verificar que backend y Ollama funcionan  
- [X] Parar servicios correctamente  

---

## 📖 Parte 6: Documentación (README.md) (Juan y Abdul)

- [ ] Incluir descripción general y propósito del proyecto  
- [ ] Listar requisitos (Node.js, Docker, Ollama, etc.)  
- [ ] Explicar instalación local y con Docker  
- [ ] Explicar estructura de carpetas  
- [ ] Documentar endpoints de la API  
- [ ] Añadir ideas de futuras extensiones  

---

## 🌿 Parte 7: Git y Control de Versiones (Juan y Abdul) 

- [ ] Hacer commits incrementales y descriptivos  
- [ ] Usar mensajes de commit claros y coherentes  
- [ ] Mantener un flujo de trabajo limpio  
- [ ] Crear Pull Request con resumen y división de tareas 