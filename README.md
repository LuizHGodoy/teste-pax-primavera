# Projeto Teste Pax Primavera BE

Este é um projeto backend desenvolvido com NestJS e Prisma, que gerencia clientes, vendas, planos e serviços. O sistema inclui autenticação JWT, validação de CPF/CNPJ.

## Índice

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Uso](#uso)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Requisitos](#requisitos)
- [Contribuições](#contribuições)
- [Licença](#licença)

## Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/)
- [Axios](https://axios-http.com/)

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/LuizHGodoy/teste-pax-primavera-be.git
   cd teste-pax-primavera-be
   ```

2. Instale as dependências:
   ```bash
   pnpm i
   ```

3. Configure o arquivo `.env`:
   - Renomeie o arquivo `.env.example` para `.env` e preencha as variáveis de ambiente:
     ```env
     DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
     JWT_SECRET=seu_segredo_jwt
     ```

4. Execute as migrações do Prisma:
   ```bash
   pnpm prisma migrate dev --name init
   ```

5. Inicie o servidor:
   ```bash
   pnpm run start:dev
   ```

## Uso

- Acesse a API em `http://localhost:3434/docs#/`.
- Utilize ferramentas como [Insomnia](https://insomnia.rest/) ou [Postman](https://www.postman.com/) para testar os endpoints.

### Endpoints Principais

- **Autenticação**
  - `POST /auth/signin`: Login de usuário.
  - `POST /auth/signup`: Registro de novo usuário.
  - `POST /auth/recover-password`: Recuperação de senha.

- **Clientes**
  - `POST /clientes`: Criar um novo cliente.
  - `GET /clientes`: Listar todos os clientes.
  - `GET /clientes/:id`: Obter detalhes de um cliente.
  - `PATCH /clientes/:id`: Atualizar um cliente.
  - `DELETE /clientes/:id`: Remover um cliente.

- **Vendas**
  - `POST /vendas`: Criar uma nova venda.
  - `GET /vendas`: Listar todas as vendas.
  - `GET /vendas/:id`: Obter detalhes de uma venda.
  - `PATCH /vendas/:id`: Atualizar uma venda.
  - `DELETE /vendas/:id`: Remover uma venda.

- **Planos**
  - `POST /planos`: Criar um novo plano.
  - `GET /planos`: Listar todos os planos.
  - `GET /planos/:id`: Obter detalhes de um plano.
  - `PATCH /planos/:id`: Atualizar um plano.
  - `DELETE /planos/:id`: Remover um plano.

- **Serviços**
  - `POST /servicos`: Criar um novo serviço.
  - `GET /servicos`: Listar todos os serviços.
  - `GET /servicos/:id`: Obter detalhes de um serviço.
  - `PATCH /servicos/:id`: Atualizar um serviço.
  - `DELETE /servicos/:id`: Remover um serviço.

## Estrutura do Projeto

```
src/
├── modules/                # Módulos da aplicação
│   ├── auth/               # Módulo de autenticação
│   ├── cliente/            # Módulo de clientes
│   ├── endereco/           # Módulo de endereços
│   ├── planos/             # Módulo de planos
│   ├── servicos/           # Módulo de serviços
│   └── vendas/             # Módulo de vendas
├── services/               # Serviços compartilhados
│   └── prisma/             # Serviço Prisma
├── main.ts                 # Ponto de entrada da aplicação
└── app.module.ts           # Módulo raiz da aplicação
```

## Requisitos

- Node.js (versão 14 ou superior)
- PostgreSQL
- Dependências do projeto instaladas


## Licença

This project is not licensed for public use. All rights reserved.
