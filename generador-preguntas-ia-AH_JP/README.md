# 🎓 Generador de Preguntas con Ollama

## 📋 Descripción

Aplicación web que utiliza **Inteligencia Artificial** (Ollama + Mistral) para generar preguntas de opción múltiple sobre temas de programación. Las preguntas se almacenan en SQLite para su posterior consulta.

**Temas disponibles**: JavaScript, Python, SQL, HTML/CSS

---

# 1. Estructura del Proyecto

```
generador-preguntas-ia-AH_JP/
├── backend/                    # Servidor Node.js + Express
│   ├── db.js                  # Configuración SQLite3
│   ├── prompts.js             # Temas y prompts para IA
│   ├── services.js            # Lógica de negocio
│   ├── routes.js              # Endpoints API REST
│   ├── server.js              # Servidor Express
│   ├── utils.js               # Funciones auxiliares
│   ├── Dockerfile             # Imagen Docker
│   └── package.json           # Dependencias
├── frontend/                   # Interfaz de usuario
│   ├── index.html
│   ├── style.css
│   └── main.js
├── docker-compose.yml         # Orquestación
└── validacion.http            # Tests de API
```

---

# 2. BACKEND

## 💻 BACKEND - Componentes Principales

### 🗄️ `db.js` - Base de Datos

Inicializa SQLite3 y crea la tabla de preguntas:

```javascript
const db = new Database('./preguntas.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS preguntas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tema TEXT NOT NULL,
    subtema TEXT,
    pregunta TEXT NOT NULL,
    opciones TEXT NOT NULL,      -- JSON con 4 opciones
    correcta TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);
```

- Descripción: En esta parte es donde se define la base de datos.

### 📝 `prompts.js` - Temas

Define los temas y prompts para la IA:

```javascript
export const temas = [
  {
    id: 'javascript',
    nombre: 'JavaScript Avanzado',
    descripcion: 'ES6+, asincronía, promesas, closures, DOM',
    prompt: `Genera {num_preguntas} preguntas sobre "{subtema}"...`
  },
  // python, sql, html_css...
];
```

**Placeholders**: `{num_preguntas}`, `{subtema}`

- Descripción: En esta parte es donde le definimos los temas y los prompts para la IA.  

---

### ⚙️ `services.js` - Lógica de la Aplicación

#### Función principal: `generarPreguntas()`

```javascript
export const generarPreguntas = async (temaId, numPreguntas, subtema) => {
  // 1. Validar entrada (tema, rango 1-5, tipo entero)
  // 2. Buscar tema en array de temas
  // 3. Construir prompt personalizado
  // 4. Llamar a Ollama con timeout de 60s
  // 5. Procesar respuesta streaming
  // 6. Parsear JSON de la respuesta
  // 7. Guardar preguntas en SQLite
  // 8. Retornar preguntas guardadas
};
```

**Configuración de entorno**:
```javascript
const AI_ENV = process.env.AI_ENV || "home";
const URL_API = AI_ENV === "school" 
  ? process.env.AI_API_URL_SCHOOL    // Ollama local
  : process.env.AI_API_URL_HOME;     // Ollama remoto
```

- Descripción: En esta parte es donde se define la lógica de la aplicación.


#### Otras funciones:

- `obtenerPreguntas(tema)` - Recupera preguntas de un tema
- `eliminarPregunta(id)` - Elimina una pregunta
- `limpiarTema(tema)` - Elimina todas las preguntas de un tema

### 🌐 `routes.js` - API REST

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/` | Info general de la API |
| GET | `/api/health` | Estado del servidor y Ollama |
| GET | `/api/temas` | Lista de temas disponibles |
| POST | `/api/generate` | Generar preguntas |
| GET | `/api/preguntas?tema=X` | Obtener preguntas de un tema |
| GET | `/api/preguntas/:id` | Obtener pregunta por ID |
| DELETE | `/api/preguntas/:id` | Eliminar pregunta |
| DELETE | `/api/preguntas/tema/:tema` | Limpiar tema completo |

**Ejemplo de uso**:

```http
POST /api/generate
Content-Type: application/json

{
  "tema": "javascript",
  "numPreguntas": 3,
  "subtema": "promesas y async/await"
}
```

**Respuesta**:
```json
{
  "success": true,
  "preguntas": [
    {
      "id": 1,
      "tema": "javascript",
      "subtema": "promesas y async/await",
      "pregunta": "¿Qué devuelve una función async?",
      "opciones": "[\"Una promesa\",\"Un callback\",\"Un observable\",\"Un generator\"]",
      "correcta": "Una promesa"
    }
  ],
  "mensaje": "Se generaron 3 preguntas para el tema \"javascript\""
}
```

- Descripción: En esta parte es donde se define la API REST.

### 🖥️ `server.js` - Servidor Express 

Configura Express con CORS, parseo JSON y sirve el frontend:

```javascript
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);                                    // API
app.use(express.static(path.join(__dirname, '../frontend'))); // Frontend

app.listen(PORT, () => {
  console.log(`🚀 Backend en http://localhost:${PORT}/api`);
});
```
- Descripción: En esta parte es donde se configura el servidor.

---

## 📦 Dependencias

```json
{
  "express": "^4.18.2",        // Framework web
  "cors": "^2.8.5",            // CORS
  "dotenv": "^17.0.0",         // Variables de entorno
  "better-sqlite3": "^9.2.2",  // SQLite
  "node-fetch": "^3.3.0"       // Cliente HTTP
}
```



## 🎯 Flujo de Trabajo

1. Usuario selecciona tema → `GET /api/temas`
2. Usuario solicita preguntas → `POST /api/generate`
3. Backend valida datos y construye prompt
4. Backend llama a Ollama (modelo Mistral)
5. Ollama genera preguntas en JSON
6. Backend parsea y guarda en SQLite
7. Backend devuelve preguntas al frontend
8. Frontend muestra las preguntas

---


# 4 Validaciónes

# 4.1 📸 Capturas de Pantalla - Validación de la API

## 📋 Archivo `validacion.http`

Este archivo contiene todas las peticiones HTTP para probar los endpoints de la API. Se usa con la extensión **REST Client** de VS Code.

---

## 🖼️ Capturas de Validación

### 1️⃣ **deleteById.png** - Eliminar pregunta por ID
```http
DELETE http://localhost:3005/api/preguntas/1
```
**Respuesta esperada:**
```json
{
  "success": true,
  "mensaje": "Pregunta eliminada correctamente"
}
```
![Eliminar pregunta por ID](public/img/deleteById.png)

---

### 2️⃣ **deleteAll.png** - Eliminar todas las preguntas de un tema
```http
DELETE http://localhost:3005/api/preguntas/tema/javascript
```
**Respuesta esperada:**
```json
{
  "success": true,
  "eliminadas": 5,
  "mensaje": "Se eliminaron 5 preguntas del tema javascript"
}
```
![Eliminar todas las preguntas de un tema](public/img/deleteAll.png)

---

### 3️⃣ **errorFueraRango.png** - Error: Número de preguntas fuera de rango
```http
POST http://localhost:3005/api/generate
Content-Type: application/json

{
  "tema": "javascript",
  "numPreguntas": 10
}
```
**Respuesta esperada:**
```json
{
  "success": false,
  "error": "numPreguntas debe estar entre 1 y 5",
  "codigo": 400
}
```
![Error fuera de rango](public/img/errorFueraRango.png)

---

### 4️⃣ **errorSinTema.png** - Error: Falta el parámetro tema
```http
POST http://localhost:3005/api/generate
Content-Type: application/json

{
  "numPreguntas": 3
}
```
**Respuesta esperada:**
```json
{
  "success": false,
  "error": "Debes indicar el tema y el número de preguntas",
  "codigo": 400
}
```
![Error sin tema](public/img/errorSinTema.png)

---

### 5️⃣ **generate.png** - Generar preguntas exitosamente
```http
POST http://localhost:3005/api/generate
Content-Type: application/json

{
  "tema": "javascript",
  "numPreguntas": 3,
  "subtema": "promesas y async/await"
}
```
**Respuesta esperada:**
```json
{
  "success": true,
  "preguntas": [
    {
      "id": 1,
      "tema": "javascript",
      "subtema": "promesas y async/await",
      "pregunta": "¿Qué devuelve una función async?",
      "opciones": "[\"Una promesa\",\"Un callback\",\"Undefined\",\"Un observable\"]",
      "correcta": "Una promesa"
    }
  ],
  "mensaje": "Se generaron 3 preguntas para el tema \"javascript\""
}
```
![Generar preguntas](public/img/generate.png)

---

### 6️⃣ **getById.png** - Obtener pregunta por ID
```http
GET http://localhost:3005/api/preguntas/1
```
**Respuesta esperada:**
```json
{
  "id": 1,
  "tema": "javascript",
  "subtema": "promesas y async/await",
  "pregunta": "¿Qué devuelve una función async?",
  "opciones": "[\"Una promesa\",\"Un callback\",\"Undefined\",\"Un observable\"]",
  "correcta": "Una promesa",
  "created_at": "2024-12-10 10:30:00"
}
```
![Obtener pregunta por ID](public/img/getById.png)

---

### 7️⃣ **gettheme.png** - Obtener preguntas por tema
```http
GET http://localhost:3005/api/preguntas?tema=javascript
```
**Respuesta esperada:**
```json
[
  {
    "id": 1,
    "tema": "javascript",
    "subtema": "promesas",
    "pregunta": "¿Qué devuelve una función async?",
    "opciones": "[...]",
    "correcta": "Una promesa"
  },
  {
    "id": 2,
    "tema": "javascript",
    "subtema": "arrays",
    "pregunta": "¿Qué hace el método map()?",
    "opciones": "[...]",
    "correcta": "Transforma cada elemento"
  }
]
```
![Obtener preguntas por tema](public/img/gettheme.png)

---

### 8️⃣ **health.png** - Health Check
```http
GET http://localhost:3005/api/health
```
**Respuesta esperada:**
```json
{
  "status": "ok",
  "ollama": "connected",
  "timestamp": "2024-12-10T10:30:00.000Z"
}
```
![Health Check](public/img/health.png)

---

### 9️⃣ **info.png** - Información general de la API
```http
GET http://localhost:3005/api/
```
**Respuesta esperada:**
```json
{
  "nombre": "API Generador de Preguntas",
  "version": "1.0.0",
  "descripcion": "API para generar preguntas con IA usando Ollama",
  "endpoints": [
    "GET /api/health",
    "GET /api/temas",
    "POST /api/generate",
    "GET /api/preguntas",
    "DELETE /api/preguntas/:id"
  ]
}
```
![Información de la API](public/img/info.png)

---

### 🔟 **listThemes.png** - Lista de temas disponibles
```http
GET http://localhost:3005/api/temas
```
**Respuesta esperada:**
```json
[
  {
    "id": "javascript",
    "nombre": "JavaScript Avanzado",
    "descripcion": "ES6+, async/await, promesas, closures"
  },
  {
    "id": "python",
    "nombre": "Python Avanzado",
    "descripcion": "Decoradores, generadores, comprehensions"
  },
  {
    "id": "sql",
    "nombre": "SQL",
    "descripcion": "Consultas, joins, subconsultas, optimización"
  }
]
```
![Lista de temas](public/img/listThemes.png)

---

### 1️⃣1️⃣ **temaNoValido.png** - Error: Tema no válido
```http
POST http://localhost:3005/api/generate
Content-Type: application/json

{
  "tema": "ruby",
  "numPreguntas": 2
}
```
**Respuesta esperada:**
```json
{
  "success": false,
  "error": "Tema no válido. Temas disponibles: javascript, python, sql, html_css",
  "codigo": 400
}
```
![Tema no válido](public/img/temaNoValido.png)

---

## 🎯 Validaciones Implementadas

### ✅ Validaciones en `/api/generate`:
- Tema es obligatorio
- numPreguntas es obligatorio
- numPreguntas debe ser un número entero
- numPreguntas debe estar entre 1 y 5
- El tema debe existir en la lista de temas disponibles

### ✅ Validaciones en `/api/preguntas/:id`:
- El ID debe existir en la base de datos
- Retorna 404 si no se encuentra

### ✅ Validaciones en `/api/preguntas?tema=X`:
- El tema debe ser válido
- Retorna array vacío si no hay preguntas

---

**🎉 Todas las validaciones funcionan correctamente según las capturas**





