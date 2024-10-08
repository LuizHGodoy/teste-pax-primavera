/*
  Warnings:

  - You are about to drop the `ItemCarrinho` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ServicoItemCarrinho` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `planoUuid` to the `Venda` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vendedorUuid` to the `Venda` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ItemCarrinho" DROP CONSTRAINT "ItemCarrinho_planoUuid_fkey";

-- DropForeignKey
ALTER TABLE "ItemCarrinho" DROP CONSTRAINT "ItemCarrinho_vendaUuid_fkey";

-- DropForeignKey
ALTER TABLE "_ServicoItemCarrinho" DROP CONSTRAINT "_ServicoItemCarrinho_A_fkey";

-- DropForeignKey
ALTER TABLE "_ServicoItemCarrinho" DROP CONSTRAINT "_ServicoItemCarrinho_B_fkey";

-- AlterTable
ALTER TABLE "Venda" ADD COLUMN     "planoUuid" TEXT NOT NULL,
ADD COLUMN     "vendedorUuid" TEXT NOT NULL;

-- DropTable
DROP TABLE "ItemCarrinho";

-- DropTable
DROP TABLE "_ServicoItemCarrinho";

-- CreateTable
CREATE TABLE "_ServicoToVenda" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ServicoToVenda_AB_unique" ON "_ServicoToVenda"("A", "B");

-- CreateIndex
CREATE INDEX "_ServicoToVenda_B_index" ON "_ServicoToVenda"("B");

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_planoUuid_fkey" FOREIGN KEY ("planoUuid") REFERENCES "Plano"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServicoToVenda" ADD CONSTRAINT "_ServicoToVenda_A_fkey" FOREIGN KEY ("A") REFERENCES "Servico"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServicoToVenda" ADD CONSTRAINT "_ServicoToVenda_B_fkey" FOREIGN KEY ("B") REFERENCES "Venda"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
