import { Module } from "@nestjs/common";
import { PrismaService } from "src/services/prisma/prisma.service";
import { AditionalServicesController } from "./aditional-services.controller";
import { AditionalServicesService } from "./aditional-services.service";

@Module({
	controllers: [AditionalServicesController],
	providers: [AditionalServicesService, PrismaService],
})
export class AditionalServicesModule {}
