# Wealth Planner Frontend

Frontend para sistema de planejamento financeiro multi family office, desenvolvido com **React**, **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS** e **Shadcn UI**.

## 🏗️ Stack & Tecnologias

- **React 18** – Biblioteca principal para UI
- **Next.js 14** – Framework fullstack, App Router, SSR/SSG
- **TypeScript** – Tipagem estática
- **Tailwind CSS** – Estilização utilitária
- **Shadcn UI** – Componentes UI modernos
- **Radix UI** – Primitivas de acessibilidade
- **Axios** – Requisições HTTP
- **React Hook Form + Zod** – Formulários e validação
- **Recharts** – Gráficos e visualização de dados
- **Lucide React** – Ícones SVG
- **Sonner** – Toasts e notificações

## 📁 Estrutura de Pastas

```
app/
  ├── layout.tsx                # Layout global
  ├── page.tsx                  # Landing page
  ├── login/                    # Tela de login
  │     └── page.tsx
  ├── register/                 # Tela de cadastro
  │     └── page.tsx
  ├── clientes/                 # Área de clientes
  │     ├── layout.tsx
  │     ├── page.tsx
  │     └── dashboard/
  │           └── page.tsx      # Dashboard do cliente
  ├── fonts/                    # Fontes customizadas
  └── globals.css               # Estilos globais
```

## 🚀 Como rodar o projeto

### Pré-requisitos

- Node.js 20+
- npm ou yarn

### Instalação

1. **Clone o repositório**
    ```bash
    git clone <repository-url>
    cd wealth-planner-frontend
    ```

2. **Instale as dependências**
    ```bash
    npm install
    # ou
    yarn install
    ```

3. **Configure variáveis de ambiente**
    - Se necessário, crie um arquivo `.env.local` para configurar a URL do backend:
      ```
      NEXT_PUBLIC_API_URL=http://localhost:4000
      ```

4. **Inicie o servidor de desenvolvimento**
    ```bash
    npm run dev
    # ou
    yarn dev
    ```

5. **Acesse**
    - [http://localhost:3000](http://localhost:3000)

## 🗄️ Integração com Backend

- O frontend consome a API REST do Wealth Planner Backend (Node.js/Fastify).
- Autenticação via JWT (token salvo em cookie).
- Endpoints principais:
    - `/api/v1/auth/login` – Login
    - `/api/v1/auth/register` – Cadastro
    - `/api/v1/clients` – Listagem de clientes
    - `/api/v1/clients/:id/wallet` – Carteira do cliente

## 🧩 Funcionalidades

- **Login e Cadastro** com validação (React Hook Form + Zod)
- **Sidebar Dinâmica** com navegação entre telas
- **Dashboard de Clientes**: busca, seleção, gráficos e resumo financeiro
- **Gráficos interativos** (Pie, etc) com visualização de alocação e alinhamento
- **Componentes UI modernos** (Shadcn, Radix, Lucide)
- **Responsivo e acessível**

## 🧪 Testes & Qualidade

- ESLint configurado (`npm run lint`)
- Tipagem estrita com TypeScript
- Componentização e separação de responsabilidades

## 📝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'feat: NovaFeature'`)
4. Push para sua branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

## 📄 Licença

MIT

---

**Wealth Planner Frontend** – Planejamento financeiro para multi family