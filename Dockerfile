
FROM node:18.13.0

WORKDIR /app
COPY ./package*.json .
RUN npm install
RUN npm install -g @angular/cli
COPY . .
EXPOSE 4200 49153
CMD ["npm", "run", "start_docker"]
