import { Module } from "@nestjs/common";
import { EnderecoController } from "./endereco.controller";
import { EnderecoService } from "./endereco.service";

@Module({
	controllers: [EnderecoController],
	providers: [EnderecoService],
	exports: [EnderecoService],
})
export class EnderecoModule {}
