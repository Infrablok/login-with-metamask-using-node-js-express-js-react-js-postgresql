FROM node:latest
COPY . /app
RUN cd /app && npm install
WORKDIR /app
EXPOSE 8080/tcp
CMD npm start
