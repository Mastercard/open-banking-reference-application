FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm i --ignore-scripts
CMD ["npm", "start"]