# 1. Define all Build Arguments (ADD PAYPAL HERE)
ARG REACT_APP_SERVER_URL
ARG REACT_APP_GOOGLE_SITE_KEY
ARG REACT_APP_PAYPAL_CLIENT_ID  # <--- 🟢 ADD THIS LINE

# 2. Copy and Install Dependencies
COPY package*.json ./
RUN npm install

# 3. Copy source code
COPY . .

# 4. Build the app using the ARGs
RUN REACT_APP_SERVER_URL=$REACT_APP_SERVER_URL \
    REACT_APP_GOOGLE_SITE_KEY=$REACT_APP_GOOGLE_SITE_KEY \
    REACT_APP_PAYPAL_CLIENT_ID=$REACT_APP_PAYPAL_CLIENT_ID \
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