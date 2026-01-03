FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev
RUN npm install eslint

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
