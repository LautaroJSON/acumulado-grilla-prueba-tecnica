# Usa una imagen base de Node.js optimizada para producción
FROM node:18-alpine

# Configura el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el contenido del proyecto al contenedor
COPY . .

# Construye la aplicación
RUN npm run build

# Expone el puerto donde correrá tu servidor Express
EXPOSE 3001

# Comando para iniciar la aplicación
CMD ["node", "dist/server.bundle.cjs"]
