FROM node:12-alpine
MAINTAINER nguyenvn

WORKDIR /usr/app
COPY ./package*.json ./
RUN npm install 
COPY ./ ./
RUN npm run build:local

EXPOSE 3000
# USER node
CMD [ "npm", "run", "start:local" ]