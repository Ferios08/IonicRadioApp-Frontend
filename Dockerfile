
FROM node:10-alpine
COPY . /www/app
RUN npm install -g cordova ionic
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY . ./
USER node
RUN npm install
COPY --chown=node:node . .
EXPOSE 8100

ENTRYPOINT ["ionic"]
CMD ["serve", "8100", "--address", "0.0.0.0"]

