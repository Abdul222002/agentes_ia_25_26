import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;
const api_base_url =process.env.API_BASE_URL;



console.log("Iniciando la generacion de los comandos CRUD\n");

/**
 * 
 * @param {Object} studentData - Object that contains the student data
 * @returns {Text} - curl command to create a student
 */
function createStudent(studentData){
     return console.log(`curl -X POST -H "Content-Type: application/json" -d '{
        "id":"${studentData.id}", 
        "name":"${studentData.nombre}",
        "email":"${studentData.email}",
        "enrollmentDate":"${studentData.enrollmentDate}",
        "active":"${studentData.active}",
        "level":"${studentData.level}"
        }' ${api_base_url}:${port}/students\n`);
};
/**
 * 
 * @returns {Text} - curl command to read all students
 */
function readAllStudents(){
    return console.log(`curl -X GET ${api_base_url}:${port}/students\n`);
};
/**
 * 
 * @param {Number} id - Student ID
 * @returns {Text} - curl command to read a student by ID
 */
function readStudentById(id){
    return console.log(`curl -X GET ${api_base_url}:${port}/students/${id}\n`);
}


/**
 * 
 * @param {Number} id - Student ID
 * @param {Object} studentData - Object that contains the student data
 * @returns {Text} - curl command to update a student by ID
 */
function updateStudent(id, studentData){
    return console.log(`curl -X PUT ${api_base_url}:${port}/students/${id} -H "Content-Type: application/json" -d '{
        "id":"${studentData.id}",
        "name":"${studentData.nombre}",
        "email":"${studentData.email}",
        "enrollmentDate":"${studentData.enrollmentDate}",
        "active":"${studentData.active}",
        "level":"${studentData.level}"
        }'\n`)
}

/**
 * 
 * @param {Number} id - Student ID 
 * @param {Object} partialData - Object that contains the student data to be updated 
 * @returns {Text} - curl command to partially update a student by ID
 */
function patchStudent(id, partialData){
    
    const data = JSON.stringify(partialData);
    return console.log(`curl -X PATCH ${api_base_url}:${port}/students/${id} -H "Content-Type: application/json" -d '${data}'\n`)
}

/**
 * 
 * @param {Number} id - Student ID
 * @returns {Text} - curl command to delete a student by ID
 */
function deleteStudent(id){
    return console.log(`curl -X DELETE ${api_base_url}:${port}/students/${id}\n`)
}



console.log(`Comando para crear un estudiante nuevo:`);
createStudent({
    "id":"8",
    "nombre":"Romualdo Contreras Jerez",
    "email":"romualdo@gmail.com",
    "enrollmentDate":"2024-10-08",
    "active":"true",
    "level":"Intermediate"
});
console.log(`Comando para leer todos los estudiantes:`);
readAllStudents();
console.log(`Comando para leer un estudiante por ID:`);
readStudentById(1);
console.log(`Comando para actualizar un estudiante por ID:`);
updateStudent(6,{
    "id":"1",
    "nombre":"Ernesto Diaz Sanchez",
    "email":"ernesto.diaz@gmail.com",
    "enrollmentDate":"2024-10-06",
    "active":"false",
    "level":"Begginer"
});
console.log(`Comando para actualizar parcialmente un estudiante por ID:`);
patchStudent(3,{
    "name":"Ana Fernandez Lozano",
    "level":"Begginer"
});
console.log(`Comando para eliminar un estudiante por ID:`);
deleteStudent(7);

