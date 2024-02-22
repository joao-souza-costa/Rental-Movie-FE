FROM node:18-alpine as build-stage

COPY . /app
WORKDIR /app
RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"];
 
