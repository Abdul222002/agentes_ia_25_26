// IMPORTACIONES SIEMPRE AL PRINCIPIO DEL FICHERO
import dontenv from 'dotenv';

// CARGO LAS VARIABLES .env a este FICHERO
dontenv.config();

//todas las variables estan en process.env.NOMBRE_DE_LA_VARIABLE
// Mostrar por consolar el valor de las variables de ENTORNO.

console.log("URL de acceso: " + process.env.URL);
console.log("Puerto de acceso: " + process.env.PORT);
console.log(`URL con Puerto: ${process.env.URL}:${Number(process.env.PORT) + 1}`);
