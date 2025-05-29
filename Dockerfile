# --- Stage 1: Build the React Application ---
FROM node:22 as build

WORKDIR /app

# Define a build argument for the backend API URL
ARG REACT_APP_API_URL_ARG

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the React application for production
# Use --build-arg to pass the value during the build process
# RUN npm run build --build-arg REACT_APP_SERVER_URL="${REACT_APP_SERVER_URL_ARG}"
# OR, if your backend URL is always the same, you can hardcode it here:
RUN REACT_APP_API_URL=https://yeilva-store-server.up.railway.app npm run build
# However, using ARG is more flexible for CI/CD

# --- Stage 2: Serve the Built Application with a Lightweight Web Server ---
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/build ./build

RUN npm install -g serve

EXPOSE 3000

CMD ["sh", "-c", "serve -s build -l ${PORT:-3000}"]