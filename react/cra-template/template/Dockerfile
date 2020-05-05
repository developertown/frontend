FROM nginx:1.17-alpine AS release
COPY build /usr/share/nginx/html
COPY nginx/nginx.conf etc/nginx/nginx.conf
COPY nginx/default-vhost.prod.conf etc/nginx/conf.d/default.template
CMD envsubst '\$PORT,\$API_HOST' < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
