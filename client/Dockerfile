FROM node:latest
COPY . /app
RUN cd /app && npm install
WORKDIR /app
EXPOSE 3000/tcp
CMD npm start
