# Build and test
FROM node:10-alpine as build

# Copy source code
WORKDIR /node-app
COPY package.json package-lock.json tsconfig.json tslint.json ./
COPY src src
COPY test test

# Install dependencies
RUN npm config set unsafe-perm true && \
    npm ci --only=production && \
    npm config set unsafe-perm false

# Build
RUN npm run build

# Install production dependencies
WORKDIR /var/www/html/api
RUN mv /home/node/app/package.json /var/www/html/api/ &&\
    mv /home/node/app/package-lock.json /var/www/html/api/ &&\
    npm config set unsafe-perm true && \
    npm ci --only=production && \
    npm config set unsafe-perm false

# Deployment
FROM node:10-alpine

# Build
WORKDIR /node-app

# Setting local time
RUN apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    echo Asia/Shanghai > /etc/timezone

# COPY production dependencies and code
COPY --from=build /var/www/html/api /var/www/html/api
COPY --from=build /home/node/app/dist /var/www/html/api/dist

CMD [ "npm", "start" ]
