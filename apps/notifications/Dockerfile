FROM node:20-alpine as development

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN yarn install

COPY apps/notifications apps/notifications
COPY libs libs

RUN cd apps/notifications && yarn install

RUN yarn build notifications

FROM node:20-alpine as production

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

COPY yarn.lock ./

RUN yarn install --production=true

COPY --from=development /usr/src/app/dist ./dist

CMD ["yarn", "start:dev:notifications"]
# CMD ["node", "dist/apps/notifications/main"]
# CMD yarn --cwd usr/src/app start:dev