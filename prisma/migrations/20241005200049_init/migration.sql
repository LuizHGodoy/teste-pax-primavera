-- CreateEnum
CREATE TYPE "TipoCliente" AS ENUM ('FISICA', 'JURIDICA');

-- CreateTable
CREATE TABLE "User" (
    "uuid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "document" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Endereco" (
    "uuid" TEXT NOT NULL,
    "logradouro" TEXT NOT NULL,
    "numero" TEXT,
    "complemento" TEXT,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cep" TEXT NOT NULL,

    CONSTRAINT "Endereco_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "uuid" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "documento" TEXT NOT NULL,
    "enderecoUuid" TEXT NOT NULL,
    "telefone" TEXT,
    "email" TEXT NOT NULL,
    "dataNascimentoFundacao" TIMESTAMP(3),
    "tipo" "TipoCliente" NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Venda" (
    "uuid" TEXT NOT NULL,
    "clienteUuid" TEXT NOT NULL,
    "dataVenda" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalVenda" DOUBLE PRECISION NOT NULL,
    "descontoAplicado" DOUBLE PRECISION DEFAULT 0,

    CONSTRAINT "Venda_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "ItemCarrinho" (
    "uuid" TEXT NOT NULL,
    "vendaUuid" TEXT NOT NULL,
    "planoUuid" TEXT NOT NULL,

    CONSTRAINT "ItemCarrinho_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Plano" (
    "uuid" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "precoBase" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Plano_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Servico" (
    "uuid" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Servico_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "_ServicoItemCarrinho" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_documento_key" ON "Cliente"("documento");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Plano_nome_key" ON "Plano"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "_ServicoItemCarrinho_AB_unique" ON "_ServicoItemCarrinho"("A", "B");

-- CreateIndex
CREATE INDEX "_ServicoItemCarrinho_B_index" ON "_ServicoItemCarrinho"("B");

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_enderecoUuid_fkey" FOREIGN KEY ("enderecoUuid") REFERENCES "Endereco"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_clienteUuid_fkey" FOREIGN KEY ("clienteUuid") REFERENCES "Cliente"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemCarrinho" ADD CONSTRAINT "ItemCarrinho_planoUuid_fkey" FOREIGN KEY ("planoUuid") REFERENCES "Plano"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemCarrinho" ADD CONSTRAINT "ItemCarrinho_vendaUuid_fkey" FOREIGN KEY ("vendaUuid") REFERENCES "Venda"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServicoItemCarrinho" ADD CONSTRAINT "_ServicoItemCarrinho_A_fkey" FOREIGN KEY ("A") REFERENCES "ItemCarrinho"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServicoItemCarrinho" ADD CONSTRAINT "_ServicoItemCarrinho_B_fkey" FOREIGN KEY ("B") REFERENCES "Servico"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
