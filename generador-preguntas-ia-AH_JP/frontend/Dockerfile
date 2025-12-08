FROM nginx:alpine

# Variables de entorno
ENV PORT=80
ENV HOST=0.0.0.0

# Copiamos todos los archivos del frontend al servidor web
COPY . /usr/share/nginx/html

# Copiamos la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponemos el puerto configurado
EXPOSE ${PORT}

CMD ["nginx", "-g", "daemon off;"]
