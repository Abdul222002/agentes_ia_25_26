# 1️⃣ Imagen base: Node.js (Debian, NO Alpine)
FROM node:20

# 2️⃣ Instalar dependencias del sistema para compilar módulos nativos
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# 3️⃣ Crear directorio de la app
WORKDIR /app

# 4️⃣ Copiar package.json y package-lock.json
COPY package*.json ./

# 5️⃣ Instalar dependencias y recompilar módulos nativos
RUN npm install --production && npm rebuild

# 6️⃣ Copiar el resto del código
COPY . .

# 7️⃣ Variables de entorno por defecto
ENV PORT=3005
ENV NODE_ENV=production

# 8️⃣ Exponer puerto
EXPOSE 3005

# 9️⃣ Comando para ejecutar
CMD ["npm", "start"]
