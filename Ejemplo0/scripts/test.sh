#!/bin/bash
# @autor: Abdul Hakim Byaz
# @comment: -
# @description: Script que usa las opciones GET, POST, DELETE, PATCH y PUT del comando curl (HTTP)

echo "===================="
echo "Ejecutando curl con GET"
echo "===================="
curl -X GET https://jsonplaceholder.typicode.com/posts/1
echo -e "\n"

echo "===================="
echo "Ejecutando curl con POST"
echo "===================="
curl -X POST https://jsonplaceholder.typicode.com/posts \
    -H "Content-Type: application/json" \
    -d '{"title":"nuevo","body":"contenido","userId":1}'
echo -e "\n"

echo "===================="
echo "Ejecutando curl con PUT"
echo "===================="
curl -X PUT https://jsonplaceholder.typicode.com/posts/1 \
    -H "Content-Type: application/json" \
    -d '{"id":1,"title":"actualizado","body":"texto","userId":1}'
echo -e "\n"

echo "===================="
echo "Ejecutando curl con PATCH"
echo "===================="
curl -X PATCH https://jsonplaceholder.typicode.com/posts/1 \
    -H "Content-Type: application/json" \
    -d '{"title":"solo título"}'
echo -e "\n"

echo "===================="
echo "Ejecutando curl con DELETE"
echo "===================="
curl -X DELETE https://jsonplaceholder.typicode.com/posts/1
echo -e "\n"
