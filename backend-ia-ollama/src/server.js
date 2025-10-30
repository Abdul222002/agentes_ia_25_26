import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';

// Cargar las variables de entorno cargadas en memoria.

config();

// 1 paso crear un servidor con express

const app=express();

// 2 paso .Crear variables basandonos en las variables de entorno cargadas en config
const PORT=Number(process.env.PORT) || 3002
const HOST=process.env.HOST || "0.0.0.0"
const NODE_ENV=process.env.NODE_ENV || "development"
const SERVER_URL=process.env.SERVER_URL || "http://localhost:3002"
const AI_API_URL=process.env.AI_API_URL || "http://localhost:11434"
const AI_MODEL=process.env.AI_MODEL || "llama3.2:1b"

// 3 paso midlewares:
// a) habilitar los cors en los navegadores
app.use(cors());
// b) habilitar el parseo de json en las peticiones 
app.use(express.json());

// 4 (opcional) Crear una funcion que muestre info al usuario

const getInfoApi= ()=>({ //Los parentesis devuelve la inormacion como si fueran un return
        service :"Servivio api-ollama",
        status:"ready",
        endpoints: {
            "GET /api":"Mostramos informacion de la API-OLLAMA",
            "GET /api/modelos":"Mostramos informacion de los modelos disponibles",
            "POST /api/consulta":"Envia un prompt para realizar consultas a la IA"
        },
        model : AI_MODEL,
        host: `${HOST}:${PORT}`,
        ollama_url: AI_API_URL
    
});

// 5 ------------GENERAR LOS ENDPOINTS ------------------ 


// ----> /

app.get("/",(req,res)=>{
    res.json(getInfoApi());
})

// ---> /api

app.get("/api",(req,res)=>{
    res.json(getInfoApi());
})


// ----> /api/models

app.get("/api/modelos",async(req,res)=>{
    // Devolvemos los modelos disponibles en ollama
    try{
        const response= await fetch(`${AI_API_URL}/api/tags`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
            signal:AbortSignal.timeout(5000),
        });

        if(!response.ok){
            throw new Error("❌ Error al realizar la peticion");
        };
        const data= await response.json();
        const models=data.models || [];
        const nameModels= models.map(model=>({modelo:model.name}));
        
        res.json(nameModels);
    }catch(error){
        res.status(502).json({
            error:"Fallo en acceso al servidor con los modelos ",
            message : error.message
        })
    }
});


// ----> /api/consulta
app.post("/api/consulta", async (req, res) => {
  
    const { prompt, model } = req.body || {};
    //El prompt es de tipo string??
    if(!prompt  || typeof prompt !== "string"){
        return res.status(400).json({
            error:"Error al escribir el prompt",
            message : error.message
        })
    }

    const modelSelected = model || AI_MODEL;
    try{
        const response = await fetch(`${AI_API_URL}/api/generate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: modelSelected,
            prompt,
            stream: false
        }),
        signal: AbortSignal.timeout(30000)
        });

        if (!response.ok) {
        throw new Error(`❌ Error HTTP ${response.status} al realizar la petición`);
        }

        const data = await response.json();
        res.json({
            prompt,
            model: modelSelected,
            respuesta:data.response 
        });
    } catch (error) {
        res.status(502).json({
            error: "Fallo en acceso al servidor con los modelos",
            message: error.message
        });
    }
});


// 6 Levantar el sevidor express para escuchar peticiones de mis endpoints
app.listen( PORT,HOST , ()=>{
    console.log("-------------🟢 Servidor Express funcionando 🟢 ------------");
    console.log(`\t Servidor escuchando http://${HOST} en el puerto ${PORT}`);
    console.log("\t Escuchando peticiones ...")
})