FROM node:14

RUN mkdir -p /app/ && chown -R node:node /app
WORKDIR /app
COPY --chown=node:node . .

USER node
ENV MONGODB_URI "mongodb://mongo:27017/race"

RUN yarn install --frozen-lockfile
RUN yarn build

CMD ["yarn", "dev"]
