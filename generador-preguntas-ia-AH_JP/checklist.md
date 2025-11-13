# ✅ Checklist Proyecto: Generador de Preguntas Inteligente con Ollama

## 🧩 Parte 1: Configuración inicial del entorno (Abdul Hakim)

- [X] Crear carpeta del proyecto `ollama-questions-[iniciales-apellidos]`
- [X] Inicializar proyecto Node.js (`npm init -y`) con nombre, versión, descripción y autor
- [X] Instalar dependencias principales:
  - [X] `express`
  - [X] `dotenv`
  - [X] `axios`
  - [X] `cors`
- [X] Crear estructura inicial:
  ```
  ├── src/
  │   ├── app.js
  │   ├── routes/
  │   ├── controllers/
  │   └── services/
  ├── .env
  ├── .env.example
  ├── package.json
  └── README.md
  ```
- [X] Configurar `.gitignore` (node_modules, .env, logs, etc.)
- [X] Configurar `package.json` con scripts:
  - [X] `"dev": "nodemon src/app.js"`
  - [X] `"start": "node src/app.js"`

---

## 🤖 Parte 2: Configuración de Ollama y conexión (Abdul Hakim)

- [ ] Instalar y verificar funcionamiento de **Ollama** en Docker o local
- [ ] Crear servicio `ollamaService.js` que gestione las peticiones a la API local de Ollama
- [ ] Configurar variables de entorno en `.env`:
  - [ ] `OLLAMA_URL=http://localhost:11434/api/generate`
  - [ ] `MODEL=gpt-3.1` *(o modelo elegido)*
  - [ ] `PORT=3000`
- [ ] Probar conexión con Ollama mediante `curl` o script de test
- [ ] Manejar errores de conexión y tiempo de espera con `try/catch`

---

## 💬 Parte 3: Backend - Generador de preguntas (Juan Pérez)

- [ ] Crear endpoint principal en `routes/questions.js`:
  - [ ] `POST /generate` → genera preguntas a partir de un texto
- [ ] Crear controlador `questionController.js`:
  - [ ] Recibe el texto desde el body
  - [ ] Llama al servicio de Ollama
  - [ ] Devuelve las preguntas generadas
- [ ] Crear middleware para validación del body (`middlewares/validateInput.js`)
- [ ] Configurar `app.js`:
  - [ ] Cargar `dotenv`
  - [ ] Importar rutas
  - [ ] Configurar `express.json()`, `cors()`, etc.
- [ ] Probar el flujo completo desde Postman o Thunder Client

---

## 🧠 Parte 4: Lógica de generación y formato (Juan Pérez)

- [ ] Definir prompt dinámico para Ollama (por ejemplo: “Genera 5 preguntas sobre el siguiente texto…”)
- [ ] Controlar formato de salida (JSON, texto plano, etc.)
- [ ] Implementar limpieza del resultado (`utils/formatResponse.js`)
- [ ] Validar que el modelo devuelve siempre 5 preguntas coherentes
- [ ] Manejar errores o respuestas vacías del modelo

---

## 🌐 Parte 5: Documentación y pruebas (Juan Pérez)

- [ ] Documentar endpoints en `README.md`:
  - [ ] URL base, método y body esperado
  - [ ] Ejemplo de request y response
- [ ] Añadir capturas de Thunder Client con pruebas de las peticiones
- [ ] Incluir guía de instalación y ejecución paso a paso
- [ ] Crear archivo `.http` con ejemplos de peticiones CRUD al generador
- [ ] Verificar funcionamiento general en entorno local (`npm run dev`)

---

## 🧾 Parte 6: Control de versiones y entrega (Abdul Hakim)

- [ ] Inicializar repositorio Git local
- [ ] Crear repositorio en GitHub y añadir colaborador (profesor)
- [ ] Subir código inicial y mantener commits descriptivos
- [ ] Crear ramas de trabajo por funcionalidad (`feature/ollama-setup`, `feature/question-api`)
- [ ] Fusionar ramas en `main` con PR revisados
- [ ] Entregar enlace del repositorio final con README completo

---

## 🎯 Entrega final

- [ ] Proyecto funcional (`npm run dev`)
- [ ] Documentación completa en `README.md`
- [ ] Capturas y ejemplos de uso
- [ ] Código subido y validado en GitHub
