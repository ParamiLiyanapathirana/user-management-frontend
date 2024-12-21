# Base image for building the frontend
FROM node:18-alpine AS build

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Base image for serving the frontend
FROM nginx:stable-alpine

# Copy built assets to Nginx
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose the port used by Nginx
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
