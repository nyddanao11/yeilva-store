# --- Stage 1: Build the React Application ---
FROM node:22 as build
# You can use node:22 if you specifically upgraded to 22 and want to use it for the build stage.

WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker's build cache
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the React application for production
RUN npm run build

# --- Stage 2: Serve the Built Application with a Lightweight Web Server ---
FROM node:20-alpine
# Using a smaller base image for the final stage (e.g., -alpine) is a common best practice
# as it results in a smaller, more secure final image.
# If you prefer, you can use FROM node:20 as well.

WORKDIR /app

# Copy the build output from the build stage
COPY --from=build /app/build ./build

# Install a simple static file server (e.g., 'serve' from npm) globally
RUN npm install -g serve

# Expose the port on which the app will run (React's default production port is not 3000 but the serve app's)
# The 'serve' package by default serves on port 3000. Railway will map this.
EXPOSE 3000

# Command to run the 'serve' web server to serve the static files
CMD ["serve", "-s", "build", "-l", "3000"]
# -s: Serve files in single-page application mode (fallback to index.html for unknown routes)
# -l 3000: Listen on port 3000