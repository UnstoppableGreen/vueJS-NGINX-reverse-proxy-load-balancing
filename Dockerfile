#FROM node:latest as build-stage
#WORKDIR ./java_course_work_front/
#COPY package*.json ./
#RUN npm install
#COPY ./ .
#RUN npm run build

#FROM nginx as production-stage
#RUN mkdir /java_course_work_front
#COPY --from=build-stage /java_course_work_front/dist /java_course_work_front
#COPY nginx.conf /etc/nginx/nginx.conf


# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR ./java_course_work_front

# add `/app/node_modules/.bin` to $PATH
#ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /java_course_work_front/package.json
COPY ./ .
RUN npm install
#RUN npm install @vue/cli@3.7.0 -g

EXPOSE 8081
# start app
CMD ["npm", "run", "serve"]