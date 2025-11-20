// 📂 backend/prompts.js

export const temas = [
  {
    id: 'javascript',
    nombre: 'JavaScript Avanzado',
    descripcion: 'Preguntas sobre ES6+, asincronía, promesas, closures y manipulación del DOM.',
    prompt: `
Eres un profesor experto en JavaScript moderno. 
Genera {num_preguntas} preguntas de opción múltiple sobre el subtema "{subtema}".
Incluye 4 opciones por pregunta y marca cuál es la correcta.
Devuelve el resultado en formato JSON:
{
  "preguntas": [
    { "pregunta": "...", "opciones": ["...","...","...","..."], "correcta": "..." }
  ]
}`
  },

  {
    id: 'python',
    nombre: 'Python para Desarrollo Backend',
    descripcion: 'Preguntas sobre sintaxis, estructuras de datos, POO y frameworks como Flask o FastAPI.',
    prompt: `
Actúa como un profesor experto en Python Backend.
Genera {num_preguntas} preguntas tipo test sobre "{subtema}".
Cada pregunta debe tener 4 opciones y una respuesta correcta claramente indicada.
Devuelve todo en formato JSON estructurado como:
{
  "preguntas": [
    { "pregunta": "...", "opciones": ["...","...","...","..."], "correcta": "..." }
  ]
}`
  },

  {
    id: 'sql',
    nombre: 'Consultas SQL y Bases de Datos',
    descripcion: 'Preguntas sobre SELECT, JOIN, subconsultas, agregaciones y normalización.',
    prompt: `
Eres un profesor experto en bases de datos relacionales.
Crea {num_preguntas} preguntas de opción múltiple sobre "{subtema}".
Incluye consultas reales y 4 opciones de respuesta (una correcta).
Formato de salida JSON:
{
  "preguntas": [
    { "pregunta": "...", "opciones": ["...","...","...","..."], "correcta": "..." }
  ]
}`
  },

  {
    id: 'html_css',
    nombre: 'HTML y CSS para Frontend',
    descripcion: 'Preguntas sobre semántica, selectores, responsive design y buenas prácticas de maquetación.',
    prompt: `
Eres un profesor de desarrollo frontend con amplia experiencia.
Genera {num_preguntas} preguntas de tipo test sobre el subtema "{subtema}".
Cada una debe tener 4 opciones y una respuesta correcta.
Usa formato JSON válido:
{
  "preguntas": [
    { "pregunta": "...", "opciones": ["...","...","...","..."], "correcta": "..." }
  ]
}`
  }
];
