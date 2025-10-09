// el fichero cliente lanazara peticiones a la API

const traerPostVinos=async()=>{
    try{
    const response=await fetch('http://192.168.70.105:4000/posts');
    const data=await response.json();
    console.log(data);
}catch (error) {
    console.error('Error al traer los posts:', error);
}
}

traerPostVinos();