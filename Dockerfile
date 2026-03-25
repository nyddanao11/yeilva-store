# --- Stage 1: Build the React Application ---
FROM node:22 as build

WORKDIR /app

# 1. Define all Build Arguments
ARG REACT_APP_SERVER_URL
ARG REACT_APP_GOOGLE_SITE_KEY

# 2. Copy and Install Dependencies
COPY package*.json ./
RUN npm install

# 3. Copy source code
COPY . .

# 4. Build the app using the ARGs as Environment Variables
# We map the ARG to a shell variable right before running the build
RUN REACT_APP_SERVER_URL=$REACT_APP_SERVER_URL \
    REACT_APP_GOOGLE_SITE_KEY=$REACT_APP_GOOGLE_SITE_KEY \
    npm run build

# --- Stage 2: Serve the Built Application ---
FROM node:20-alpine

WORKDIR /app

# Copy the build output from Stage 1
COPY --from=build /app/build ./build

# Install a lightweight server to host static files
RUN npm install -g serve

EXPOSE 3000

# Start serve, using Railway's dynamic PORT variable
CMD ["sh", "-c", "serve -s build -l ${PORT:-3000}"]