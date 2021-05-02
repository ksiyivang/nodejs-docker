
FROM node:15
WORKDIR /app
COPY package.json .
# RUN yarn install
# Run only on Development && Production Mode
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then yarn install; \
    else yarn install --only=production; \
    fi
COPY . ./
ENV PORT 8000
EXPOSE $PORT
CMD ["node","index.js"] 
