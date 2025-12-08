FROM nginx:alpine

# Variables de entorno
ENV PORT=80
ENV HOST=0.0.0.0

# Copiamos todos los archivos del frontend al servidor web
COPY . /usr/share/nginx/html

# Exponemos el puerto configurado
EXPOSE ${PORT}

CMD ["nginx", "-g", "daemon off;"]
