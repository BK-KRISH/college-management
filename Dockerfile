# Use nginx as web server
FROM nginx:alpine
COPY src/ /usr/share/nginx/html
EXPOSE 80
