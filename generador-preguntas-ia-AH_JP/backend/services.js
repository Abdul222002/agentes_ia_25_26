import { temas } from "./prompts"
import fetch from 'node-fetch';
import db from './db.js';
import dotenv from 'dotenv';
dotenv.config();

// Timeout helper
function timeout(ms) {
  return new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout de Ollama')), ms));
}

export const generarPreguntas = async (temaId, numPreguntas = 3, subtema = 'general') => {
  try {
    const MAX_PREGUNTAS = 5;
    const URL_API = import.meta.env.AI_API_URL;
    const MODEL = import.meta.env.AI_MODEL;

    // Validaciones
    if (!temaId) throw new Error('Debes indicar un tema');

    if (numPreguntas < 1 || numPreguntas > MAX_PREGUNTAS) throw new Error(`numPreguntas debe estar entre 1 y ${MAX_PREGUNTAS}`);
    // Buscar tema
    //Esto nos devolvera el objeto completo del tema en el array que nosotros definimos en prompts.js
    const tema = temas.find(t => t.id === temaId);
    if (!tema) throw new Error('Tema no válido');

    // Construir prompt
    const promptFinal = tema.prompt
      .replace('{num_preguntas}', numPreguntas)
      .replace('{subtema}', subtema);

    // Llamada a Ollama con timeout
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

    if (!response.ok) throw new Error(`Ollama respondió con status ${response.status}`);

    const data = await response.json();

    // Parsear JSON de Ollama
    const outputText = data.output || data.text || '';
    let preguntasJSON;
    try {
      preguntasJSON = JSON.parse(outputText).preguntas;
    } catch {
      throw new Error('Respuesta de Ollama no es un JSON válido');
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

export const obtenerPreguntas=(tema)=>{
    try {
    if (!tema) throw new Error('Debes indicar un tema');

    const stmt = db.prepare(`
      SELECT *
      FROM preguntas
      WHERE tema = ?
    `);

    const rows = stmt.all(tema);

    // Convertir las opciones de string JSON a array
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
      eliminadas: result.changes, // número de filas eliminadas
      mensaje: result.changes
        ? `Se eliminaron ${result.changes} preguntas del tema "${tema}"`
        : `No se encontraron preguntas para el tema "${tema}"`
    };
  } catch (error) {
    console.error('Error limpiarTema:', error.message);
    throw error;
  }
};
