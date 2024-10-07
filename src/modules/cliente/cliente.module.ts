import { Module } from "@nestjs/common";
import { EnderecoModule } from "../endereco/endereco.module";
import { ClienteController } from "./cliente.controller";
import { ClienteService } from "./cliente.service";

@Module({
	controllers: [ClienteController],
	providers: [ClienteService],
	imports: [EnderecoModule],
})
export class ClienteModule {}
