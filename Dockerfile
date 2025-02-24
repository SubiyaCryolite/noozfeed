# Build
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
 
# Production
FROM nginx:stable-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Build
# docker build -t noozfeed .

# Run
# docker run -it --rm -d -p 8080:80 --name take-home-ifunga noozfeed
# Open http://localhost:8080/

# Stop
# docker stop take-home-ifunga