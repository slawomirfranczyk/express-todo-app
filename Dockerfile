FROM node:18.0-alpine as development

ENV NODE_ENV development

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
COPY src ./src

RUN yarn install

EXPOSE $APP_PORT
CMD ["yarn", "dev"]

FROM node:18.0-alpine as production

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
COPY dist ./dist

RUN yarn install --production
EXPOSE $APP_PORT
CMD ["yarn", "start"]