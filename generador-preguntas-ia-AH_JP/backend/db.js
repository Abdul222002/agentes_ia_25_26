import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener ruta absoluta para la base de datos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear directorio db si no existe
const dbDir = path.join(__dirname, 'db');
import fs from 'fs';
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'preguntas.db');

// Crear base de datos (si no existe) y conectarse
const db = new Database(dbPath);

// Crear tabla preguntas si no existe
db.prepare(`
  CREATE TABLE IF NOT EXISTS preguntas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tema TEXT NOT NULL,
    subtema TEXT,
    pregunta TEXT NOT NULL,
    opciones TEXT NOT NULL,  -- Guardaremos JSON.stringify(opciones)
    correcta TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

console.log('Base de datos inicializada y tabla preguntas lista');

export default db;
