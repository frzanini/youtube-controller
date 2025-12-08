FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
# evita problema de permissão chamando diretamente o binário via node
RUN node node_modules/vite/bin/vite.js build

FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
