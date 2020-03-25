FROM node:10.16.0

RUN mkdir /app
WORKDIR /app
COPY package.json ./
RUN npm install -g yarn
RUN yarn

CMD ["yarn", "start" ]