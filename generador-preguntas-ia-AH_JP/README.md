# 🎓 Generador de Preguntas con Ollama

## 📋 Descripción

Aplicación web que utiliza **Inteligencia Artificial** (Ollama + Mistral) para generar preguntas de opción múltiple sobre temas de programación. Las preguntas se almacenan en SQLite para su posterior consulta.

**Temas disponibles**: JavaScript, Python, SQL, HTML/CSS

---

## 🏗️ Estructura del Proyecto

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

### ⚙️ `services.js` - Lógica de Negocio

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

---

## 🚀 Instalación y Uso

### Opción 1: Local

```bash
# 1. Instalar dependencias
cd backend
npm install

# 2. Configurar .env
cp .env.example .env
# Editar .env con tus valores

# 3. Iniciar servidor
npm run dev    # Desarrollo
npm start      # Producción
```

### Opción 2: Docker

```bash
# Levantar servicios
docker compose up -d

# Ver logs
docker compose logs -f backend

# Detener
docker compose down
```

---

## 🔐 Variables de Entorno

```env
PORT=3005
NODE_ENV=production
AI_ENV=home                                    # "home" o "school"
AI_API_URL_HOME=https://jarvis.ieshlanz.es   # Ollama remoto
AI_API_URL_SCHOOL=http://localhost:11434      # Ollama local
AI_MODEL=mistral:instruct
```

---

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

## 🧪 Testing

Usa el archivo `validacion.http` con REST Client (VS Code) o Postman:

```http
### Health Check
GET http://localhost:3005/api/health

### Generar preguntas
POST http://localhost:3005/api/generate
Content-Type: application/json

{
  "tema": "javascript",
  "numPreguntas": 2,
  "subtema": "promesas"
}

### Obtener preguntas
GET http://localhost:3005/api/preguntas?tema=javascript
```

---

## 🐛 Manejo de Errores

**Códigos HTTP**:
- `200 OK` - Operación exitosa
- `400 Bad Request` - Datos inválidos
- `404 Not Found` - Recurso no encontrado
- `500 Internal Server Error` - Error del servidor

**Formato de error**:
```json
{
  "success": false,
  "error": "Descripción del error",
  "codigo": 500
}
```

---

## 🔮 Futuras Mejoras

- [ ] Autenticación de usuarios
- [ ] Exportar preguntas a PDF
- [ ] Estadísticas de uso
- [ ] Más modelos de IA
- [ ] Integración con LMS (Moodle)

---

## 👥 Autores

**Abdul Hadi** y **José Pablo** - DAIA 2024/2025

---

## 🆘 Troubleshooting

**Problema**: `"ollama": "disconnected"`
- Verifica que Ollama esté corriendo
- Revisa la URL en `.env`
- Comprueba: `GET /api/health`

**Problema**: Error al generar preguntas
- Revisa logs: `docker compose logs backend`
- Verifica que el modelo esté disponible en Ollama
- Comprueba timeout (60s por defecto)

---

**¡Generador de Preguntas con IA! 🎓✨**
