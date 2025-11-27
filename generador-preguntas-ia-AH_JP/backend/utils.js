export const AI_API_URL = process.env.AI_API_URL || '[http://localhost:11434](http://localhost:11434)';

// Función para devolver información general de la API
export function getInfoApi() {
return {
    name: 'API de Preguntas',
    version: '1.0.0',
    description: 'API para generar, consultar y eliminar preguntas por tema',
    endpoints: [
            { method: 'GET', path: '/', description: 'Información general de la API' },
            { method: 'POST', path: '/generate', description: 'Genera nuevas preguntas' },
            { method: 'GET', path: '/preguntas', description: 'Obtiene preguntas almacenadas (opcional por tema)' },
            { method: 'GET', path: '/preguntas/:id', description: 'Obtiene pregunta específica por ID' },   
            { method: 'DELETE', path: '/preguntas/:id', description: 'Elimina pregunta por ID' },
            { method: 'DELETE', path: '/preguntas/tema/:tema', description: 'Elimina todas las preguntas de un tema' },
            { method: 'GET', path: '/temas', description: 'Lista los temas disponibles' },
            { method: 'GET', path: '/health', description: 'Estado del servidor y conexión a Ollama' }
        ]
    };
}
