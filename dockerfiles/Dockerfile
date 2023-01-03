FROM node:12.2.0-alpine as build-stage
WORKDIR /java_course_work_front
COPY package.json /java_course_work_front/package.json
COPY package-lock.json /java_course_work_front/package.json
COPY ./ .
RUN npm install
RUN npm run build

FROM nginx:1.20 as production-stage
#RUN mkdir /java_course_work_front
RUN apt-get update -qq && apt-get -y install curl
COPY ./consul-template /usr/bin/consul-template
RUN mkdir -p /consul-template /consul-template/config.d /consul-template/templates && \
    rm /etc/nginx/conf.d/*
ENV CONSUL consul:8500
COPY --from=build-stage /java_course_work_front/dist /java_course_work_front
CMD /usr/sbin/nginx -c /etc/nginx/nginx.conf && consul-template -consul-addr=$CONSUL -template "/etc/consul-templates/default.conf.ctmpl:/etc/nginx/conf.d/app.conf:/usr/sbin/nginx -s reload"