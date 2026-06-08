# Base
FROM node:24-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./
COPY prisma.config.ts* ./
COPY prisma ./prisma/

# Development
FROM base AS development
RUN npm install
COPY . .
RUN DATABASE_URL="postgresql://mock:mock@localhost:5432/mock" npx prisma generate
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Build
FROM base AS builder
RUN npm ci  
COPY . . 
RUN DATABASE_URL="postgresql://mock:mock@localhost:5432/mock" npx prisma generate
RUN npm run build


# Production
FROM node:24-alpine AS production
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci --only=production && npx prisma generate 
COPY --from=builder /usr/src/app/build ./build

USER node

EXPOSE 3000 
CMD ["node", "build/server.js"]