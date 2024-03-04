FROM node:20

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build
EXPOSE 8080

RUN npx prisma generate
CMD ["npm","start"]