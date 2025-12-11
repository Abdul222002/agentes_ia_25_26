# 1️⃣ Imagen base: Node.js (Debian, NO Alpine)
FROM node:20

# 2️⃣ Instalar dependencias del sistema para compilar módulos nativos
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# 3️⃣ Crear directorios de la app
WORKDIR /app

# 4️⃣ Copiar package.json y package-lock.json del backend
COPY backend/package*.json ./backend/

# Cambiar contexto al backend para instalar dependencias
WORKDIR /app/backend

# 5️⃣ Instalar dependencias
RUN npm install --production

# 6️⃣ Copiar código fuente
# Copiar todo el backend
COPY backend/ .
# Copiar el frontend al nivel superior (o donde lo espera el server)
COPY frontend/ ../frontend/

# 7️⃣ Variables de entorno por defecto
ENV PORT=3005
ENV NODE_ENV=production

# 8️⃣ Exponer puerto
EXPOSE 3005

# 9️⃣ Comando para ejecutar
CMD ["npm", "start"]
