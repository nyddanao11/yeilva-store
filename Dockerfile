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

WORKDIR /app

# Copy the build output from the build stage
COPY --from=build /app/build ./build

# Install a simple static file server ('serve' from npm) globally
RUN npm install -g serve

# Expose the port. This is informational but good practice.
# We'll make the CMD dynamic to listen on the actual port Railway provides.
EXPOSE 3000
# The comment that caused the error is now on its own line above, or removed.

# Command to run the 'serve' web server to serve the static files
# Use the PORT environment variable provided by Railway, or default to 3000
CMD ["sh", "-c", "serve -s build -l ${PORT:-3000}"]
# -s: Serve files in single-page application mode (fallback to index.html for unknown routes)
# -l ${PORT:-3000}: Listen on the PORT environment variable provided by Railway.
#                   If PORT is not set, it defaults to 3000.
# sh -c: Needed to correctly interpret the shell variable ${PORT:-3000}