FROM node:20.0-alpine as service

WORKDIR /usr/src/app
COPY package.json ./
RUN npm install 
COPY . .

EXPOSE 3000
RUN chmod +x './migrate.sh'

CMD ["sh", "./migrate.sh"]