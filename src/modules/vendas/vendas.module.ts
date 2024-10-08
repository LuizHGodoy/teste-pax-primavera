import { Module } from "@nestjs/common";
import { PrismaService } from "src/services/prisma/prisma.service";
import { VendasController } from "./vendas.controller";
import { VendasService } from "./vendas.service";

@Module({
	controllers: [VendasController],
	providers: [VendasService, PrismaService],
})
export class VendasModule {}
