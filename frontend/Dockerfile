FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Default nginx config; adjust if you want /api proxy here instead of via Dokploy/ingress
EXPOSE 80
