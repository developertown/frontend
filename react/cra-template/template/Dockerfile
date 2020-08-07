FROM nginx:1.17-alpine AS release
RUN apk update && apk add bash
COPY build /usr/share/nginx/html
COPY ./env.sh .
COPY nginx/nginx.conf etc/nginx/nginx.conf
COPY nginx/default-vhost.prod.conf etc/nginx/conf.d/default.template
RUN chmod +x env.sh

CMD envsubst '\$PORT,\$API_HOST' < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf && /bin/bash -c "./env.sh /usr/share/nginx/html/env.js" && nginx -g 'daemon off;'
