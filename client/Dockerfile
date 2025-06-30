FROM node:24-alpine as build

WORKDIR /app

RUN corepack enable pnpm && \
  corepack prepare pnpm --activate && \
  yes | pnpm -v

COPY pnpm-lock.yaml package.json ./

RUN pnpm install

COPY . .

RUN pnpm run build

FROM nginx:1.27-alpine

WORKDIR /usr/share/nginx/html

COPY --from=build /app/dist .

EXPOSE 80