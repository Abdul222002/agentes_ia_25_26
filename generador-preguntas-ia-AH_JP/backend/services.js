import { temas } from "./prompts.js"
import fetch from 'node-fetch';
import db from './db.js';
import dotenv from 'dotenv';

dotenv.config();

// Selección automática de entorno
const AI_ENV = process.env.AI_ENV || "home";

const URL_API =
  AI_ENV === "school"
    ? process.env.AI_API_URL_SCHOOL
    : process.env.AI_API_URL_HOME;

const MODEL = process.env.AI_MODEL || "mistral:instruct";

// Timeout helper
function timeout(ms) {
  return new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout de mistral')), ms));
}

export const generarPreguntas = async (temaId, numPreguntas = 3, subtema = 'general') => {
  try {
    const MAX_PREGUNTAS = 5;

    if (!temaId) throw new Error('Debes indicar un tema');
    if (numPreguntas < 1 || numPreguntas > MAX_PREGUNTAS)
      throw new Error(`numPreguntas debe estar entre 1 y ${MAX_PREGUNTAS}`);
    if (!Number.isInteger(numPreguntas))
      throw new Error('numPreguntas debe ser un número entero');
    
    // Buscar tema
    const tema = temas.find(t => t.id === temaId);
    if (!tema) throw new Error('Tema no válido');

    // Construir prompt
    const promptFinal = tema.prompt
      .replace('{num_preguntas}', numPreguntas)
      .replace('{subtema}', subtema);

    // Llamada a mistral con timeout
    const response = await Promise.race([
      fetch(`${URL_API}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: MODEL,
          prompt: promptFinal,
          max_tokens: 1000
        })
      }),
      timeout(60000)
    ]);

    if (!response.ok)
      throw new Error(`mistral respondió con status ${response.status}`);

    const textResponse = await response.text();
    const lines = textResponse.trim().split('\n');
    
    // Combinar todas las respuestas
    let outputText = '';
    for (const line of lines) {
      if (line.trim()) {
        const parsed = JSON.parse(line);
        outputText += parsed.response || '';
      }
    }

    if (!outputText) throw new Error('Respuesta de mistral vacía');
    
    let preguntasJSON;
    try {
      let parsed;
      try {
        parsed = JSON.parse(outputText);
      } catch (e) {
        const jsonMatch = outputText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error('No se encontró JSON en la respuesta');
        
        parsed = JSON.parse(jsonMatch[0]);
      }
      
      preguntasJSON = parsed.preguntas;

      if (!Array.isArray(preguntasJSON) || preguntasJSON.length === 0) {
        throw new Error('El JSON no contiene un array de preguntas válido');
      }
    } catch (error) {
      console.error('Error al procesar respuesta de mistral:', error.message);
      throw new Error('Respuesta de mistral no es un JSON válido: ' + error.message);
    }

    // Guardar en SQLite3
    const insert = db.prepare(`
      INSERT INTO preguntas (tema, subtema, pregunta, opciones, correcta)
      VALUES (@tema, @subtema, @pregunta, @opciones, @correcta)
    `);

    const preguntasGuardadas = [];
    for (const p of preguntasJSON) {
      const info = {
        tema: temaId,
        subtema,
        pregunta: p.pregunta,
        opciones: JSON.stringify(p.opciones),
        correcta: p.correcta
      };

      const result = insert.run(info);
      preguntasGuardadas.push({ id: result.lastInsertRowid, ...info });
    }

    return preguntasGuardadas;

  } catch (error) {
    console.error('Error generarPreguntas:', error.message);
    throw error;
  }
};

// Obtener preguntas
export const obtenerPreguntas=(tema='')=>{
  try {
    if (!tema) throw new Error('Debes indicar un tema');

    const stmt = db.prepare(`
      SELECT *
      FROM preguntas
      WHERE tema = ?
    `);

    const rows = stmt.all(tema);

    const preguntas = rows.map(r => ({
      ...r,
      opciones: JSON.parse(r.opciones)
    }));

    return preguntas;
  } catch (error) {
    console.error('Error obtenerPreguntas:', error.message);
    throw error;
  }
}

// Eliminar pregunta
export const eliminarPregunta = (id) => {
  try {
    if (!id || isNaN(id)) throw new Error('Debes indicar un id de pregunta válido');

    const stmt = db.prepare(`
      DELETE FROM preguntas
      WHERE id = ?
    `);

    const result = stmt.run(id);

    if (result.changes === 0) {
      return { success: false, mensaje: 'No se encontró la pregunta con ese id' };
    }

    return { success: true, mensaje: 'Pregunta eliminada correctamente' };
  } catch (error) {
    console.error('Error eliminarPregunta:', error.message);
    throw error;
  }
};

// Limpiar tema
export const limpiarTema = (tema) => {
  try {
    if (!tema) throw new Error('Debes indicar un tema');

    const stmt = db.prepare(`
      DELETE FROM preguntas
      WHERE tema = ?
    `);

    const result = stmt.run(tema);

    return {
      success: true,
      eliminadas: result.changes,
      mensaje: result.changes
        ? `Se eliminaron ${result.changes} preguntas del tema "${tema}"`
        : `No se encontraron preguntas para el tema "${tema}"`
    };
  } catch (error) {
    console.error('Error limpiarTema:', error.message);
    throw error;
  }
};
