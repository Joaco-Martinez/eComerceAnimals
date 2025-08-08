# Usa imagen oficial de Node
FROM node:18

# Crea carpeta de trabajo
WORKDIR /app

# Copia archivos de dependencias
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia todo el código
COPY . .

# Genera Prisma Client (si usás)
RUN npx prisma generate

# Compila TypeScript (si usás)
RUN npm run build

# Expone el puerto del backend
EXPOSE 3000

# Comando para arrancar el servidor
CMD ["npm", "run", "start"]
