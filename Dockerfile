FROM node:16-alpine
WORKDIR /app
EXPOSE 4000
CMD ["npm", "run", "start:dev"]
