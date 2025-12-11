import express from 'express';
import fetch from 'node-fetch';
import { generarPreguntas, obtenerPreguntas, obtenerPreguntaPorId, eliminarPregunta, limpiarTema } from './services.js';
import { temas } from './prompts.js';
import { getInfoApi, AI_API_URL } from './utils.js';

const router = express.Router();

// ------------------------
// Endpoint info general
// ------------------------
// 🟢 GET /api → Información general de la API
/**
 * @openapi
 * /api:
 *   get:
 *     tags: [Info]
 *     summary: Información general de la API
 *     responses:
 *       200:
 *         description: Información de la API
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InfoApi'
 */
router.get('/', (req, res) => {
  res.json(getInfoApi());
});

// ------------------------
// Generar preguntas nuevas
// ------------------------
// 🟢 POST /api/generate
// Recibe: { tema, numPreguntas, subtema }
// Responde: { success: true, preguntas: [...], mensaje: "..." }
/**
 * @openapi
 * /api/generate:
 *   post:
 *     tags: [Preguntas]
 *     summary: Generar preguntas nuevas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GenerarPreguntas'
 *     responses:
 *       200:
 *         description: Preguntas generadas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenerarPreguntasResponse'
 */
router.post('/generate', async (req, res) => {
  try {
    const { tema, numPreguntas, subtema } = req.body;

    // Validar que tema y numPreguntas estén presentes (permitir 0 para que se valide el rango en services.js)
    if (!tema || numPreguntas === null || numPreguntas === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Debes indicar el tema y el número de preguntas',
        codigo: 400
      });
    }

    const preguntas = await generarPreguntas(tema, numPreguntas, subtema || '');

    res.json({
      success: true,
      preguntas,
      mensaje: `Se generaron ${preguntas.length} preguntas para el tema "${tema}"`
    });
  } catch (error) {
    console.error('Error en /api/generate:', error.message);
    res.status(500).json({
      success: false,
      error: error.message,
      codigo: 500
    });
  }
});

// ------------------------
// Obtener preguntas
// ------------------------
// 🟢 GET /api/preguntas?tema=javascript (opcional)
/**
 * @openapi
 * /api/preguntas:
 *   get:
 *     tags: [Preguntas]
 *     summary: Obtener preguntas
 *     parameters:
 *       - name: tema
 *         in: query
 *         description: Tema de las preguntas
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Preguntas obtenidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Preguntas'
 */
router.get('/preguntas', (req, res) => {
  try {
    const { tema } = req.query;
    const preguntas = obtenerPreguntas(tema || '');
    res.json(preguntas);
  } catch (error) {
    console.error('Error /api/preguntas:', error.message);
    res.status(500).json({ success: false, error: error.message, codigo: 500 });
  }
});

// 🟢 GET /api/preguntas/:id → pregunta específica
/**
 * @openapi
 * /api/preguntas/{id}:
 *   get:
 *     tags: [Preguntas]
 *     summary: Obtener pregunta específica
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la pregunta
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pregunta obtenida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pregunta'
 */
router.get('/preguntas/:id', (req, res) => {
  try {
    const { id } = req.params;
    const pregunta = obtenerPreguntaPorId(id);

    if (!pregunta) {
      return res.status(404).json({
        success: false,
        error: 'Pregunta no encontrada',
        codigo: 404
      });
    }

    res.json(pregunta);
  } catch (error) {
    console.error('Error /preguntas/:id:', error.message);
    res.status(500).json({
      success: false,
      error: error.message,
      codigo: 500
    });
  }
});

// ------------------------
// Eliminar preguntas
// ------------------------
// 🟢 DELETE /api/preguntas/:id → eliminar por ID
/**
 * @openapi
 * /api/preguntas/{id}:
 *   delete:
 *     tags: [Preguntas]
 *     summary: Eliminar pregunta por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la pregunta
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pregunta eliminada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EliminarPreguntaResponse'
 */
router.delete('/preguntas/:id', (req, res) => {
  try {
    const { id } = req.params;
    const resultado = eliminarPregunta(id);

    if (!resultado.success) {
      return res.status(404).json({
        success: false,
        error: resultado.mensaje,
        codigo: 404
      });
    }

    res.json({
      success: true,
      mensaje: resultado.mensaje
    });
  } catch (error) {
    console.error('Error DELETE /preguntas/:id:', error.message);
    res.status(500).json({ success: false, error: error.message, codigo: 500 });
  }
});

// 🧹 DELETE /api/preguntas/tema/:tema → limpiar todas las preguntas de un tema
/**
 * @openapi
 * /api/preguntas/tema/{tema}:
 *   delete:
 *     tags: [Preguntas]
 *     summary: Eliminar todas las preguntas de un tema
 *     parameters:
 *       - name: tema
 *         in: path
 *         description: Tema de las preguntas
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Preguntas eliminadas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LimpiarTemaResponse'
 */
router.delete('/preguntas/tema/:tema', (req, res) => {
  try {
    const { tema } = req.params;
    const resultado = limpiarTema(tema);

    if (!resultado.success) {
      return res.status(404).json({ success: false, error: resultado.mensaje, codigo: 404 });
    }

    res.json({
      success: true,
      eliminadas: resultado.eliminadas || 0
    });
  } catch (error) {
    console.error('Error DELETE /preguntas/tema/:tema:', error.message);
    res.status(500).json({ success: false, error: error.message, codigo: 500 });
  }
});

// ------------------------
// Lista de temas
// ------------------------
// 🟢 GET /api/temas
/**
 * @openapi
 * /api/temas:
 *   get:
 *     tags: [Temas]
 *     summary: Lista de temas
 *     responses:
 *       200:
 *         description: Lista de temas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Temas'
 */
router.get('/temas', (req, res) => {
  try {
    console.log('Solicitando temas. ¿temas definido?', !!temas);
    if (!temas) throw new Error('temas está undefined');

    const listaTemas = temas.map(t => ({
      id: t.id,
      nombre: t.nombre,
      descripcion: t.descripcion
    }));

    console.log('Enviando temas:', listaTemas.length);
    res.json(listaTemas);
  } catch (error) {
    console.error('Error /api/temas:', error.message);
    res.status(500).json({ success: false, error: error.message, codigo: 500 });
  }
});

// ------------------------
// Health check
// ------------------------
// 🟢 GET /api/health → estado del servidor y conexión a Ollama
/**
 * @openapi
 * /api/health:
 *   get:
 *     tags: [Health]
 *     summary: Estado del servidor y conexión a Ollama
 *     responses:
 *       200:
 *         description: Estado del servidor y conexión a Ollama
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthCheck'
 */
router.get('/health', async (req, res) => {
  try {
    let ollamaStatus = 'disconnected';
    try {
      const response = await fetch(`${AI_API_URL}/api/tags`);
      if (response.ok) ollamaStatus = 'connected';
    } catch (err) {
      console.error('Ollama ping error:', err.message);
    }

    res.json({
      status: 'ok',
      ollama: ollamaStatus,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error /api/health:', error.message);
    res.status(500).json({ success: false, error: error.message, codigo: 500 });
  }
});

export default router;
