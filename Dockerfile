FROM node:24-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# False URL to prevent Prisma from trying to connect to the database during build time and failing due to the database service not being available yet.
ENV DATABASE_URL="postgresql://postgres:postgres@localhost:5432/placeholder?schema=public"

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]