// Fichero encargado de levantar una API REST con Express
// Import 

import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import { dataAPI } from './db/db.js';

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

// Endpoint de prueba
app.get('/',(req,res)=>{
    res.json({ message: 'Mini API de POST de futbol',
        version: "1.0.0",
        endpoints: {
            "GET/posts": "Obtener todos los posts de mi API",
        }
     });
})


app.get('/posts',(req,res)=>{
    console.log("Peticion GET para traer los post de mi api");
    res.json({
        success: true,  
        data:dataAPI,
        //para que se auto incrementen : count: posts.length
        count: dataAPI.length
    });
});

app.delete('/posts/:id',(req,res)=>{
    const { id }=req.params;
    console.log(`Peticion DELETE para eliminar el post con id ${id} de mi api`);
    const index=dataAPI.findIndex(post=>post.id===parseInt(id));
    if(index!==-1){
        dataAPI.splice(index,1);
        res.json({
            success: true,
            message: `Post con id ${id} eliminado de mi api`
        });
    }else{
        res.status(404).json({
            success: false,
            message: `Post con id ${id} no encontrado`
        });
    }
});


// Iniciar el servidor
app.listen(PORT,HOST,()=>{
    console.log(`Servidor de ABDUL HB ejecutandose ---> ${HOST}:${PORT} - Modo ${NODE_ENV}`);
    console.log(`URL del servidor ---> ${SERVER_URL}:${PORT}`);
    console.log(`👌👌`);
});