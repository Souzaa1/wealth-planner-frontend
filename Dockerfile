# Estágio 1: Instalação do pnpm e dependências
FROM node:20-slim AS deps
WORKDIR /app

# Instala o pnpm globalmente
RUN npm install -g pnpm

# Copia os arquivos de manifesto de dependências
COPY package.json pnpm-lock.yaml ./

# Instala as dependências usando pnpm
RUN pnpm install --frozen-lockfile

# Estágio 2: Build da aplicação
FROM node:20-slim AS builder
WORKDIR /app

# Instala o pnpm globalmente
RUN npm install -g pnpm

# Copia as dependências instaladas do estágio anterior
COPY --from=deps /app/node_modules ./node_modules
# Copia o restante do código da aplicação
COPY . .

# Define a variável de ambiente para a URL do backend
ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}

# Executa o build da aplicação
RUN pnpm build

# Estágio 3: Imagem de produção
FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copia os artefatos de build otimizados do estágio anterior
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Expõe a porta 3000
EXPOSE 3000

# Comando para iniciar o servidor Next.js em modo standalone
CMD ["node", "server.js"]
