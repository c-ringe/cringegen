FROM node:18-alpine
RUN mkdir /home/app
COPY . /home/app
WORKDIR /home/app
RUN yarn && yarn build
CMD ["yarn", "start"]