FROM node:18-alpine
WORKDIR /usr/app
COPY /dist/apps/datahub/browser ./
CMD node server/main.js
EXPOSE 4000
