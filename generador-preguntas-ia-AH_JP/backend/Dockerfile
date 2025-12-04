
# 1️⃣ Imagen base: Node.js
FROM node:20-alpine

# 2️⃣ Crear directorio de la app
WORKDIR /app

# 3️⃣ Copiar package.json y package-lock.json
COPY package*.json ./

# 4️⃣ Instalar dependencias
RUN npm install --production

# 5️⃣ Copiar el resto del código
COPY . .

# 6️⃣ Variables de entorno por defecto
ENV PORT=3005
ENV NODE_ENV=production

# 7️⃣ Exponer puerto
EXPOSE 3005

# 8️⃣ Comando para ejecutar
CMD ["npm", "start"]
