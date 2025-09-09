# Etapa 1 - build da aplicação Angular
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build -- --configuration production

# Etapa 2 - servir a aplicação com Nginx
FROM nginx:alpine

COPY --from=build /app/dist/pjc-desaparecidos/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
