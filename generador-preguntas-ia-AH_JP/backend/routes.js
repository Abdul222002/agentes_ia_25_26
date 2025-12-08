import express from 'express';
import fetch from 'node-fetch';
import { generarPreguntas, obtenerPreguntas, eliminarPregunta, limpiarTema } from './services.js';
import { temas } from './prompts.js';
import { getInfoApi, AI_API_URL } from './utils.js';

const router = express.Router();

// ------------------------
// Endpoint info general
// ------------------------
// 🟢 GET /api → Información general de la API
router.get('/', (req, res) => {
  res.json(getInfoApi());
});

// ------------------------
// Generar preguntas nuevas
// ------------------------
// 🟢 POST /api/generate
// Recibe: { tema, numPreguntas, subtema }
// Responde: { success: true, preguntas: [...], mensaje: "..." }
router.post('/generate', async (req, res) => {
  try {
    const { tema, numPreguntas, subtema } = req.body;

    if (!tema || !numPreguntas) {
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
router.get('/preguntas/:id', (req, res) => {
  try {
    const { id } = req.params;
    const preguntas = obtenerPreguntas(); // devuelve todas si no hay tema
    const pregunta = preguntas.find(p => p.id == id);

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
router.delete('/preguntas/tema/:tema', (req, res) => {
  try {
    const { tema } = req.params;
    const resultado = limpiarTema(tema);

    if (!resultado.success) {
      return res.status(404).json({ success: false, error: resultado.mensaje, codigo: 404 });
    }

    res.json({
      success: true,
      eliminadas: resultado.changes || 0
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
router.get('/temas', (req, res) => {
  try {
    const listaTemas = temas.map(t => ({
      id: t.id,
      nombre: t.nombre,
      descripcion: t.descripcion
    }));

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
router.get('/health', async (req, res) => {
  try {
    let ollamaStatus = 'disconnected';
    try {
      const response = await fetch(`${AI_API_URL}/models`);
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
