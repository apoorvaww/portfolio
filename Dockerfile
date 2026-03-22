FROM node:20

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# 1. ADD THIS: Build the optimized production app
RUN npm run build

EXPOSE 3000

# 2. CHANGE THIS: Start the production server instead of dev
CMD ["npm", "run", "start"]