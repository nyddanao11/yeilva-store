# Use a base image with the latest Node.js LTS version installed
FROM node:22 
# You could also use FROM node:lts, which will automatically pull the latest LTS.
# However, specifying a major version like '20' gives you more control and predictability.
# If you upgraded to Node.js 22, use FROM node:22 or FROM node:jod (its codename)

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker's build cache
# This means if your dependencies don't change, Docker won't re-run npm install
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application source code to the container
COPY . .

# Specify the command to run when the container starts
CMD ["npm", "start"]