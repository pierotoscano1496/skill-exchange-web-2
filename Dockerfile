# compilado
FROM node:20.11.0-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

RUN npm run build

# ejecución
FROM node:20.11.0-alpine AS runner
WORKDIR /app
ENV NEXT_PUBLIC_MAIN_URL_BACKEND=https://skill-exchange-backend-b36ba056d3f1.herokuapp.com/api/
COPY package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

RUN npm ci --only=production
EXPOSE 3000
CMD ["npm", "start"]