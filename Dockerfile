FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
RUN npm install dotenv-cli
COPY src ./src
COPY .env.example ./.env
COPY prisma ./prisma
COPY tsconfig.json ./
COPY prisma.config.ts ./
RUN npx prisma generate
RUN npm run build

FROM node:24-alpine
WORKDIR /app
COPY --from=builder /app/.env .env
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/generated ./generated
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./

EXPOSE 4000
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]
