FROM docker.io/node:lts-alpine
WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
RUN npm ci --omit=dev --ignore-scripts

COPY --chown=node:node dist/apps/data-platform/ ./dist

ENV NODE_ENV production
ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

CMD ["node", "dist/main.js"]
