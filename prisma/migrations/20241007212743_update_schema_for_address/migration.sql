/*
  Warnings:

  - Made the column `numero` on table `Endereco` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Endereco" ALTER COLUMN "numero" SET NOT NULL;
