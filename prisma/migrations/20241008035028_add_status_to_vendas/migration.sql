-- CreateEnum
CREATE TYPE "VendaStatus" AS ENUM ('ATIVA', 'FINALIZADA', 'CANCELADA');

-- AlterTable
ALTER TABLE "Venda" ADD COLUMN     "status" "VendaStatus" NOT NULL DEFAULT 'ATIVA';
