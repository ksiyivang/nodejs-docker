
FROM node:15
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . ./
ENV PORT 8000
EXPOSE $PORT
CMD ["yarn","dev"] 
