import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;
const api_base_url =process.env.API_BASE_URL;

function createStudent(studentData){
     return console.log(`curl -X POST -H "Content-Type: application/json -d '{
        "id":"${studentData.id}", 
        "name":"${studentData.nombre}",
        "email":"${studentData.email}",
        "enrollmentDate":"${studentData.enrollmentDate}",
        "active":"${studentData.active}",
        "level":"${studentData.level}",
        }' ${api_base_url}:${port}/students`);
};

function readAllStudents(){
    return console.log(`curl -X GET ${api_base_url}:${port}/students`);
};

// id nombre email enrolmentdate active level