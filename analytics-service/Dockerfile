FROM node:latest

# for standalone 
ARG RABBITMQ_URL
ARG MONGODB_URI

ENV RABBITMQ_URL=$RABBITMQ_URL
ENV MONGODB_URI=$MONGODB_URI

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install -g @nestjs/cli
RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]

EXPOSE 4000