#!/bin/bash

respuesta=""

if [[ -f "./package.json" ]]; then
    respuesta="El archivo package.json existe."
else
    respuesta="El archivo package.json no existe."
fi

if [[ -f "./src/db/db.json" ]]; then
    respuesta+="\nEl archivo db.json existe."
else
    respuesta="\nEl archivo db.json no existe."
fi

if [[ -f "./.gitignore" ]]; then
    respuesta+="\nEl archivo .gitignore existe."
else
    respuesta+="\nEl archivo .gitignore no existe."
fi

if [[ -f "./.env.example" ]]; then
    respuesta+="\nEl archivo .env.example existe."
else
    respuesta+="\nEl archivo .env.example no existe."
fi

if [[ -f "./README.md" ]]; then
    respuesta+="\nEl archivo README.md existe."
else
    respuesta+="\nEl archivo README.md no existe."
fi

if [[ -f "./checklist.md" ]]; then
    respuesta+="\nEl archivo checklist.md existe."
else
    respuesta+="\nEl archivo checklist.md no existe."
fi

if [[ -f "./peticiones-crud.http" ]]; then
    respuesta+="\nEl archivo peticiones-crud.http existe."
else
    respuesta+="\nEl archivo peticiones-crud.http no existe."
fi

if [[ -d "./src" ]]; then
    respuesta+="\nEl directorio src existe."
else
    respuesta+="\nEl directorio src no existe."
fi

if [[ -f "./src/crud-curl.js" ]]; then
    respuesta+="\nEl archivo crud-curl.js existe."
else
    respuesta+="\nEl archivo crud-curl.js no existe."
fi

if [[ -d "./images" ]]; then
    respuesta+="\nEl directorio images existe."
else
    respuesta+="\nEl directorio images no existe."
fi

if [[ -d "./scripts" ]]; then
    respuesta+="\nEl directorio scripts existe."
else
    respuesta+="\nEl directorio scripts no existe."
fi

if [[  -f "./images/thunderClient/create_student_headers.png" && -f "./images/thunderClient/create_student.png" && -f "./images/thunderClient/deleteEnrollments.png" &&  -f "./images/thunderClient/getAllStudents.png" &&  -f "./images/thunderClient/getStudentById.png" &&  -f "./images/thunderClient/patchStudent.png" ]]; then
    respuesta+="\nExisten almenos 6 capturas de pantalla de Thunder Client."
else
    respuesta+="\nNo existen almenos 6 capturas de pantalla de Thunder Client."
fi

contenidoPackageJson=$(cat ./package.json)

if  echo "$contenidoPackageJson" | grep -q '"type": *"module"'; then
    respuesta+="\nEl archivo package.json contiene 'type': 'module'."
else
    respuesta+="\nEl archivo package.json no contiene 'type': 'module'."
fi

if echo "$contenidoPackageJson" | grep -q '"dotenv"'; then
    respuesta+="\ndotenv está instalado."
else
    respuesta+="\ndotenv no está instalado."
fi

if echo "$contenidoPackageJson" | grep -q '"json-server"'; then
    respuesta+="\njson-server está instalado."
else
    respuesta+="\njson-server no está instalado."
fi

if echo "$contenidoPackageJson" | grep -q '"server:up"'; then
    respuesta+="\nElscript server:up está creado"
else
    respuesta+="\nEl script server:up no está creado"
fi

if echo "$contenidoPackageJson" | grep -q '"crud:curl"'; then
    respuesta+="\nEl script crud-curl está creado"
else
    respuesta+="\nEl script crud-curl no está creado"
fi

echo "Realizando validacion de archivos y carpetas"
echo -e "$respuesta"

