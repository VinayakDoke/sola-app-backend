# Stage 1: Dependencies
FROM node:22-alpine AS deps
WORKDIR /app

# Install dependencies only
COPY package*.json ./
RUN npm ci --only=production --legacy-peer-deps

# Stage 2: Final runtime
FROM node:22-alpine AS production
WORKDIR /app

# Copy only production node_modules and source code
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Expose backend port (default: 4000)
EXPOSE 4000

# Use Node directly in production (not nodemon)
CMD ["npm", "run", "start"]
