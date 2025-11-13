document.getElementById("btnModelos").addEventListener("click", async () => {
    try{
        //const response = await fetch("http://localhost:3002/api/modelos");
        const response = await fetch("api/consulta",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: "Que modelos de IA existen?",
                model: "llama3.2:1b"
            }),
        });
        if (!response.ok) {
            throw new Error(`Error al obtener los modelos: ${response.statusText}`);
        }
        const data = await response.json();
        console.table(data.modelos);

        const nombreModelos=data.modelos.map((modelo) => modelo.name);
        // Seleccionamos el parrafo que queremos mostrar la Informacion
        document.getElementById("mostrarModelos").textContent = `Modelos disponibles: ${nombreModelos.join(', ')}`;
    }catch(e){
        console.log(e);
        document.getElementById("mostrarModelos").textContent = `Error al obtener los modelos: ${e.message}`;
    }
 
});