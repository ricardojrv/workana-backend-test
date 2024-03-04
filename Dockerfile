FROM node:20

WORKDIR /app
RUN apt-get update -qq && \
    apt-get install -y python-is-python3 pkg-config build-essential openssl

COPY package*.json ./
RUN npm install

RUN npm prune --production

COPY . .

RUN npm run build
EXPOSE 8080

CMD npx prisma generate;npx prisma migrate dev --name init;npm start