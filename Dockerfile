# ---------- BUILD ----------
FROM node:24-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# ---------- PRODUCTION ----------
FROM node:24-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

# --- non-root ---
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

USER appuser

EXPOSE 4000

CMD ["node", "dist/main.js"]