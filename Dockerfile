# Etapa 1: Construcción (Build)
FROM node:18-alpine AS builder

ARG NEXT_PUBLIC_JAVA_BACKEND_URL
ENV NEXT_PUBLIC_JAVA_BACKEND_URL=${NEXT_PUBLIC_JAVA_BACKEND_URL}

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Producción
FROM node:18-alpine

WORKDIR /app

# Copia los archivos construidos de la etapa anterior
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Expone el puerto en el que corre Next.js
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]