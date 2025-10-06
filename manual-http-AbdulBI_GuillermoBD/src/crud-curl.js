import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;
const api_base_url =process.env.API_BASE_URL;

function createStudent(studentData){

    console.log("Ejecutando POST de los datos");

     return console.log(`curl -X POST -H "Content-Type: application/json -d '{
        "id":"${studentData.id}", 
        "name":"${studentData.nombre}",
        "email":"${studentData.email}",
        "enrollmentDate":"${studentData.enrollmentDate}",
        "active":"${studentData.active}",
        "level":"${studentData.level}"
        }' ${api_base_url}:${port}/students`);
};

function readAllStudents(){
    console.log("Ejecutando get de todos los estudiantes");

    return console.log(`curl -X GET ${api_base_url}:${port}/students`);
};

function readStudentById(id){
    console.log(`Ejecutando GET del usuario con el id: ${id}`);

    return console.log(`curl -X GET ${api_base_url}:${port}/students/${id}`);
}

function updateStudent(id, studentData){
    return console.log(`cur -X PUT ${api_base_url}:${port} -H "Content-Type: application/json -d '{
        "id":"${studentData.id}",
        "name":"${studentData.nombre}",
        "email":"${studentData.email}",
        "enrollmentDate":"${studentData.enrollmentDate}",
        "active":"${studentData.active}",
        "level":"${studentData.level}"
        }'`)
}


function patchStudent(id, partialData){
    return console.log(`cur -X PATCH ${api_base_url}:${port} -H "Content-Type: application/json -d '{
        "id":"${partialData.id}",
        "name":"${partialData.nombre}",
        "email":"${partialData.email}",
        }'`)
}

function deleteStudent(id){
    return console.log(`curl -X DELETE ${api_base_url}:${port}/students/${id}`)
}
