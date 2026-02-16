# ---- Stage 1: Build Frontend ----
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY congregados-front/package*.json ./
RUN npm ci
COPY congregados-front/ ./
RUN npm run build

# ---- Stage 2: Build Backend ----
FROM node:18-alpine AS backend-build
WORKDIR /app/backend
COPY congregados-back/package*.json ./
RUN npm ci
COPY congregados-back/ ./
RUN npm run build

# ---- Stage 3: Production ----
FROM node:18-alpine AS production
WORKDIR /app

COPY congregados-back/package*.json ./
RUN npm ci --omit=dev

COPY --from=backend-build /app/backend/dist ./dist
COPY --from=frontend-build /app/frontend/dist ./public

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "dist/main.js"]