import dotenv from "dotenv";
import { exec } from "child_process";
dotenv.config();

const port = process.env.PORT;
const api_base_url = process.env.API_BASE_URL;

console.log("Iniciando la generacion de los comandos CRUD\n");

function createStudent(studentData, cb){
    const URL_BASE = `${api_base_url}:${port}/students`;
    const idValue = isNaN(Number(studentData.id)) ? studentData.id : Number(studentData.id);
    const name = studentData.name ?? studentData.nombre;
    const json = JSON.stringify({
        id: idValue,
        name,
        email: studentData.email,
        enrollmentDate: studentData.enrollmentDate,
        active: studentData.active,
        level: studentData.level
    }).replace(/"/g, '\\"');

    const cmd = `curl -s -X POST -H "Content-Type: application/json" -d "${json}" ${URL_BASE}`;

    exec(cmd, (error, stdout, stderror) => {
        if (error) {
            console.error("Error ejecutando el curl-->", error.message);
            if (typeof cb === "function") cb(error);
            return;
        }
        if (stderror) {
            console.error("Error en la salida del curl-->", stderror);
            if (typeof cb === "function") cb(new Error(stderror));
            return;
        }
        console.log(stdout);
        if (typeof cb === "function") cb(null, stdout);
    });
}

function readAllStudents(cb){
    const URL_BASE = `${api_base_url}:${port}/students`;
    const cmd = `curl -s -X GET ${URL_BASE}`;
    exec(cmd, (error, stdout, stderror) => {
        if (error) {
            console.error("Error ejecutando el curl-->", error.message);
            if (typeof cb === "function") cb(error);
            return;
        }
        if (stderror) {
            console.error("Error en la salida del curl-->", stderror);
            if (typeof cb === "function") cb(new Error(stderror));
            return;
        }
        console.log(stdout);
        if (typeof cb === "function") cb(null, stdout);
    });
}

function readStudentById(id, cb){
    const URL_PATH = `${api_base_url}:${port}/students/${id}`;
    const cmdPath = `curl -s -X GET ${URL_PATH}`;
    exec(cmdPath, (error, stdout, stderror) => {
        if (error) {
            console.error("Error ejecutando el curl-->", error.message);
            if (typeof cb === "function") cb(error);
            return;
        }
        if (stderror) {
            console.error("Error en la salida del curl-->", stderror);
            // no return; intentamos evaluar stdout
        }
        const out = (stdout || "").trim();
        // si no hay resultado o Not Found, devolvemos tal cual (el caller puede decidir fallback)
        console.log(out || "Not Found");
        if (typeof cb === "function") cb(null, out);
    });
}

function updateStudent(id, studentData, cb){
    const URL_BASE = `${api_base_url}:${port}/students/${id}`;
    const idValue = isNaN(Number(studentData.id)) ? studentData.id : Number(studentData.id);
    const name = studentData.name ?? studentData.nombre;
    const json = JSON.stringify({
        id: idValue,
        name,
        email: studentData.email,
        enrollmentDate: studentData.enrollmentDate,
        active: studentData.active,
        level: studentData.level
    }).replace(/"/g, '\\"');

    const cmd = `curl -s -X PUT ${URL_BASE} -H "Content-Type: application/json" -d "${json}"`;
    exec(cmd, (error, stdout, stderror) => {
        if (error) {
            console.error("Error ejecutando el curl-->", error.message);
            if (typeof cb === "function") cb(error);
            return;
        }
        if (stderror) {
            console.error("Error en la salida del curl-->", stderror);
            if (typeof cb === "function") cb(new Error(stderror));
            return;
        }
        const out = (stdout || "").trim();
        console.log(out || "Not Found");
        if (typeof cb === "function") cb(null, out);
    });
}

function patchStudent(id, partialData, cb){
    const URL_BASE = `${api_base_url}:${port}/students/${id}`;
    const json = JSON.stringify(partialData).replace(/"/g, '\\"');
    const cmd = `curl -s -X PATCH ${URL_BASE} -H "Content-Type: application/json" -d "${json}"`;
    exec(cmd, (error, stdout, stderror) => {
        if (error) {
            console.error("Error ejecutando el curl-->", error.message);
            if (typeof cb === "function") cb(error);
            return;
        }
        if (stderror) {
            console.error("Error en la salida del curl-->", stderror);
            if (typeof cb === "function") cb(new Error(stderror));
            return;
        }
        const out = (stdout || "").trim();
        console.log(out || "Not Found");
        if (typeof cb === "function") cb(null, out);
    });
}

function deleteStudent(id, cb){
    const URL_BASE = `${api_base_url}:${port}/students/${id}`;
    const cmd = `curl -s -X DELETE ${URL_BASE}`;
    exec(cmd, (error, stdout, stderror) => {
        if (error) {
            console.error("Error ejecutando el curl-->", error.message);
            if (typeof cb === "function") cb(error);
            return;
        }
        if (stderror) {
            console.error("Error en la salida del curl-->", stderror);
            if (typeof cb === "function") cb(new Error(stderror));
            return;
        }
        const out = (stdout || "").trim();
        console.log(out || "Not Found");
        if (typeof cb === "function") cb(null, out);
    });
}

/* ejecución secuencial (callbacks) */
function runAllCRUD() {
    console.log(`Creando un estudiante nuevo:`);
    createStudent({
        id: "8",
        name: "Romualdo",
        email: "romualdo@gmail.com",
        enrollmentDate: "2024-10-08",
        active: true,
        level: "Intermediate"
    }, (err) => {
        if (err) { console.error("createStudent falló, abortando."); return; }

        console.log(`Leyendo todos los estudiantes:`);
        readAllStudents((err) => {
            if (err) { console.error("readAllStudents falló, abortando."); return; }

            console.log(`Leyendo al estudiante por ID:`);
            readStudentById(8, (err) => {
                if (err) { console.error("readStudentById falló, abortando."); return; }

                console.log(`Actualizando al estudiante por ID:`);
                updateStudent(8, {
                    id: "8",
                    name: "Ernesto",
                    email: "ernesto.diaz@gmail.com",
                    enrollmentDate: "2024-10-06",
                    active: false,
                    level: "Beginner"
                }, (err) => {
                    if (err) { console.error("updateStudent falló, abortando."); return; }

                    console.log(`Actualizando parcialmente la informacion del usuario por ID:`);
                    patchStudent(8, {
                        level: "Intermediate"
                    }, (err) => {
                        if (err) { console.error("patchStudent falló, abortando."); return; }

                        console.log(`Eliminando al usuario por ID:`);
                        deleteStudent(8, (err) => {
                            if (err) { console.error("deleteStudent falló."); return; }
                            console.log("Cadena CRUD finalizada.");
                        });
                    });
                });
            });
        });
    });
}

runAllCRUD();