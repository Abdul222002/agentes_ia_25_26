#!/bin/bash
# @autor: Abdul Hakim
# @comment:-
# @description: Script que valida si tenemos instalados: git, node, npm, curl

clear 

echo "Verificando los requisitos previos..."

if command -v node > /dev/null 2>&1; then
    NODE_VERSION=$(node --version)
    echo "Node instalado correctamente: version $NODE_VERSION"
else
    echo "No tienes instalado NodeJS"
    exit 1
fi

if command -v git  > /dev/null 2>&1; then
    GIT_VERSION=$(git --version)
    echo "Git instalado correctamente: version $GIT_VERSION"
else
    echo "No tienes instalado Git"
    exit 1
fi

if command -v npm > /dev/null 2>&1; then
    NPM_VERSION=$(npm --version)
    echo "Npm instalado correctamente: version $NPM_VERSION"
else
    echo "No tienes instalado Npm"
    exit 1
fi

if command -v curl > /dev/null 2>&1; then
    CURL_VERSION=$(curl --version)
    echo "Curl instalado correctamente: version $CURL_VERSION"
else
    echo "No tienes instalado Curl"
    exit 1
fi

echo "Todos los paquetes instalados correctamente"
