FROM node:10.15.3
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run-script build
EXPOSE 1337
CMD [ "node", "server" ]