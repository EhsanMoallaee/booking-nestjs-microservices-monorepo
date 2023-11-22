FROM node:20-alpine as development

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn*.lock ./
COPY tsconfig.json tsconfig.json

RUN yarn install

COPY apps/auth apps/auth
COPY libs libs

RUN cd apps/auth && yarn install

RUN yarn build

FROM node:20-alpine as production

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

COPY yarn*.lock ./

RUN yarn install --production=true

COPY --from=development /usr/src/app/dist ./dist

# CMD ["yarn", "start:dev:auth"]
CMD ["node", "dist/apps/auth/main"]
# CMD yarn --cwd usr/src/app start:dev