FROM nginx:1.17-alpine AS release
RUN apk update && apk add bash nodejs
COPY build /usr/share/nginx/html
COPY ./envjs-generator.js .
COPY nginx/nginx.conf etc/nginx/nginx.conf
COPY nginx/default-vhost.prod.conf etc/nginx/conf.d/default.template

CMD envsubst '\$PORT,\$API_HOST' < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf && /bin/bash -c "node ./envjs-generator.js /usr/share/nginx/html/env.js" && nginx -g 'daemon off;'
