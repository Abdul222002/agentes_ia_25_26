// Importaciones
import { config } from 'dotenv';
import { exec } from 'child_process';

//Declaraciones de variables
config(); // <---- Carga las variables de entorno desde el archivo .env

const API_URL= process.env.API_URL;

// Funciones

export const getAllUsers=()=>{
    // Logica para obtener todos los usuarios
    const URL_BASE=`${API_URL}/users`;
    // Realizar la solicitud HTTP para obtener los usuarios
    const cmd=`curl -s GET ${URL_BASE}`;
    exec(cmd,(error,stdout,stderr)=>{
        if(error){
            console.error("Error al ejecutar el comando:",error.message);
            return;
        }
        if(stderr){
            console.error("Error en la salida :",stderr);
            return;
        }

        const data=JSON.parse(stdout);
        console.log("Usuarios obtenidos:",data);
        console.table(data);

    });
}
