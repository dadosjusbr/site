FROM node:lts as dependencies

WORKDIR /site
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts as builder

WORKDIR /site
COPY . .
COPY --from=dependencies /site/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner

WORKDIR /site
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
# COPY --from=builder /site/next.config.js ./
COPY --from=builder /site/public ./public
COPY --from=builder /site/.next ./.next
COPY --from=builder /site/node_modules ./node_modules
COPY --from=builder /site/package.json ./package.json
EXPOSE $PORT
ENV PORT=$PORT \
    DEFAULT_API_BASE_URL=$DEFAULT_API_BASE_URL \
    API_BASE_URL=$API_BASE_URL \
    PACKAGE_REPO_URL=$PACKAGE_REPO_URL \
    ID_ANALYTICS=$ID_ANALYTICS

CMD ["yarn", "start"]
