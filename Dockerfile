FROM node:18.16.0 AS builder

ARG CALENDAR_BACKEND_URL

WORKDIR /build
COPY . ./

RUN npm ci
RUN npm run build

FROM node:18.16.0-alpine as calendar-web

WORKDIR /app

ENV CI=true
ENV SERVER_PORT=8080
EXPOSE 8080

COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/package*.json ./
COPY --from=builder /build/server.js ./
COPY --from=builder /build/dist/ ./dist

CMD node server.js
