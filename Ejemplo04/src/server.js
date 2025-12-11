// Fichero encargado de levantar una API REST con Express
// Import 

import { config } from 'dotenv';
import express from 'express';

// Declaraciones de variables
config(); // Carga las variables de entorno desde el archivo .env

const PORT = process.env.PORT || 4001;
const NODE_ENV = process.env.NODE_ENV ;
const SERVER_URL = process.env.SERVER_URL || `http://localhost`;
const HOST = process.env.HOST;


const app=express();

// CORS voy a permitir peticiones desde cualquier origen
app.use(cors());

// voy a permitir peticiones con body en formato JSON
app.use(express.json());

// Middleware de registro de solicitudes
app.use((req, res, next) => {
    const timeData=new Date().toISOString();
    console.log(`${timeData} - ${req.method} request to ${req.url} - IP ${req.ip}`);

    next();
});