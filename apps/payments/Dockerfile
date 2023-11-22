FROM node:20-alpine as development

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN yarn install

COPY apps/payments apps/payments
COPY libs libs

RUN cd apps/payments && yarn install

RUN yarn build payments

FROM node:20-alpine as production

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

COPY yarn.lock ./

RUN yarn install --production=true

COPY --from=development /usr/src/app/dist ./dist

CMD ["yarn", "start:dev:payments"]
# CMD ["node", "dist/apps/payments/main"]
# CMD yarn --cwd usr/src/app start:dev
