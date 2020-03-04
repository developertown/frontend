# Deployment

At DeveloperTown React applications can be deployed to production in a number of ways

## Docker (nginx)

### Configure .dockerignore

```
/node_modules
```

### Configure Dockerfile

The following docker file assumes:

1. the production build of the React application (`yarn build`) has already occurred and the resulting static asset files are written to a directory called `build`
2. the `nginx.conf` and `default-vhost.prod.conf` are defined in a directory called `nginx`.  Examples of these configuration files can be found below
3. an environment variable for `PORT` and `API_HOST` is provided at runtime of the docker image.
   * PORT: the port for nginx to listen on (likely 80)
   * API_HOST: the host and port of the API Service to proxy requests to 

```
FROM nginx:1.16-alpine AS release
RUN apk update && apk add -f dnsmasq
COPY build /usr/share/nginx/html
COPY nginx/nginx.conf etc/nginx/nginx.conf
COPY nginx/default-vhost.prod.conf etc/nginx/conf.d/default.template
CMD envsubst '\$PORT,\$API_HOST' < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
```

### Add nginx config

PROJECT_HOME/nginx/default-vhost.prod.conf

```
server {
    listen       ${PORT};
    server_name  _;

    gzip on;
    gzip_disable "msie6";

    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_buffers 16 8k;
    gzip_http_version 1.1;
    gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;

    location @api {
        proxy_pass ${API_HOST} ;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location / {
        root   /usr/share/nginx/html;

        location /api {
            try_files $uri @api;
        }

        location /swagger {
            try_files $uri @api;
        }

        try_files $uri /index.html;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

PROJECT_HOME/nginx/nginx.conf

```
user  nginx;
worker_processes  1;

error_log  /dev/stderr;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    resolver 127.0.0.11 ipv6=off;

    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /dev/stdout main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}
```

## S3 and CloudFront
