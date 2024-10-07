/*
  Warnings:

  - You are about to drop the column `dataNascimentoFundacao` on the `Cliente` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cliente" DROP COLUMN "dataNascimentoFundacao",
ADD COLUMN     "dataNascimento" TIMESTAMP(3);
