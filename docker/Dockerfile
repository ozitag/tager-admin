# Reference: https://vuejs.org/v2/cookbook/dockerize-vuejs-app.html

# build stage
FROM node:16-alpine as build-stage
WORKDIR /var/www/app

# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
# Reference: https://habr.com/ru/company/ruvds/blog/491710/
RUN apk --no-cache add --virtual builds-deps build-base py-pip

COPY ./admin/package.json ./
COPY ./admin/yarn.lock ./
RUN yarn

COPY ./admin .

ARG BUILD_ENV
RUN yarn build --mode=${BUILD_ENV}

# production stage
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /var/www/app/dist /var/www/app
COPY ./docker/admin/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
