# need an OS to run my api
FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

#install node dependencies
RUN npm install

#build my app
RUN npm run build

#copy my app files to this OS
COPY . .

EXPOSE 3000

#run my api
CMD [ "npm", "start"]