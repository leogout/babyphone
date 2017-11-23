FROM node:latest
ENV APP=/usr/src/app/
RUN mkdir -p $APP
COPY package.json $APP
WORKDIR $APP
RUN npm install
EXPOSE 8000
CMD [ "npm", "start" ]
