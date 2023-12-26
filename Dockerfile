# Use a base image with Node.js installed
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy the application source code to the container
COPY . /app

# Install application dependencies with --legacy-peer-deps
RUN npm install --legacy-peer-deps

# Specify the command to run when the container starts
CMD ["npm", "start"]
