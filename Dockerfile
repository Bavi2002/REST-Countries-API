# Step 1: Build the React app
FROM node:18 AS build

# Set working directory in container
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the source code
COPY . ./

# Build the React app for production
RUN npm run build

# Step 2: Serve the app using a minimal web server (serve)
FROM nginx:alpine

# Copy the build from the previous step
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the app
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
