FROM node:16.6.0-alpine as common-build-stage

COPY . ./app

WORKDIR /app

RUN npm install

EXPOSE 3333

COPY ./scripts/init_queue.sh /init.sh

RUN chmod +x /init.sh

# Development build stage
FROM common-build-stage as development-build-stage

ENV NODE_ENV development

ENTRYPOINT ["/init.sh"]

# Production build stage
FROM common-build-stage as production-build-stage

ENV NODE_ENV production

CMD ["npm", "run", "start"]
