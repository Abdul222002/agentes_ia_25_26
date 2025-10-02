# ✅ Checklist Proyecto CRUD HTTP Manual - 2º DAW

## Parte 1: Configuración inicial del proyecto

- [x] Crear carpeta del proyecto `manual-http-[iniciales-apellidos]` (Abdul)
- [x] Inicializar proyecto Node.js (`npm init`) con nombre, versión, descripción y autor (Guillermo)
- [x] Instalar dependencias: `json-server`, `dotenv`(Abdul)
- [x] Configurar `package.json`: (Guille)
  - [x] `"type": "module"`
  - [x] Script `server:up` para levantar json-server 
  - [x] Script `crud:curl` para ejecutar `src/crud-curl.js`
  - [x] Script `validate` para ejecutar `scripts/validate.sh`
- [x] Crear estructura de carpetas y archivos según requisitos (Abdul)
- [x] Configurar `.env` con variables `PORT`, `API_BASE_URL`, `NODE_ENV`(Guille)
- [x] Crear `.env.example`(Guille)
- [x] Configurar `.gitignore` (node_modules, .env, logs, SO files, carpetas de editores)(Abdul)

## Parte 2: Script CRUD con JavaScript (Guille)

- [ ] `src/crud-curl.js`: importar `dotenv` y cargar variables de entorno
- [ ] Implementar funciones CRUD:
  - [ ] `createStudent(studentData)`
  - [ ] `readAllStudents()`
  - [ ] `readStudentById(id)`
  - [ ] `updateStudent(id, studentData)`
  - [ ] `patchStudent(id, partialData)`
  - [ ] `deleteStudent(id)`
- [ ] Ejecutar todas las funciones al final del script
- [ ] Mensajes informativos al inicio y final

## Parte 3: Documentación CRUD con Curl 

- [ ] Documentar cada operación CRUD en `README.md`
- [ ] Explicar flags, headers, método HTTP y código de estado
- [ ] Capturar respuestas reales al ejecutar los comandos

## Parte 4: Thunder Client (Abdul)

- [ ] Crear colección `CRUD Students API`
- [ ] Configurar entorno de variables: `baseUrl`, `port`, `fullUrl`
- [ ] Crear peticiones: POST, GET (all y by ID), PUT, PATCH, DELETE
- [ ] Capturas de pantalla de cada petición en `images/`
- [ ] Documentar uso en README con capturas

## Parte 5: REST Client (Abdul)

- [ ] Crear archivo `peticiones-crud.http`
- [ ] Definir variables: `@baseUrl`, `@port`, `@apiUrl`
- [ ] Implementar todas las operaciones CRUD, separar con `###`, añadir comentarios
- [ ] Probar todas las peticiones desde VS Code

## Parte 6: Script de validación (Guille)

- [ ] `scripts/validate.sh`: 
  - [ ] Validar existencia de archivos y carpetas esenciales
  - [ ] Verificar `package.json` (type, dependencias, scripts)
  - [ ] Verificar capturas en `images/`
  - [ ] Mostrar mensaje final de validación

## Parte 7: Git y GitHub (Abdul)

- [x] Crear repositorio en GitHub y añadir profesor
- [x] Inicializar Git local, conectar remoto, crear rama `main` y subir código inicial
- [x] Crear rama `m1/http-request-response` y trabajar en ella
- [x] Realizar commits incrementales con mensajes descriptivos
  