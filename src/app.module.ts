import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AuthModule } from "./modules/auth/auth.module";
import { JwtAuthGuard } from "./modules/auth/guards/jtw-auth.guard";
import { ClienteModule } from "./modules/cliente/cliente.module";
import { EnderecoModule } from "./modules/endereco/endereco.module";
import { PlansModule } from "./modules/planos/plans.module";
import { AditionalServicesModule } from "./modules/servicos/aditional-services.module";
import { UsersModule } from "./modules/users/users.module";
import { PrismaModule } from "./services/prisma/prisma.module";
import { VendasModule } from './modules/vendas/vendas.module';

@Module({
	imports: [
		PrismaModule,
		UsersModule,
		AuthModule,
		ClienteModule,
		EnderecoModule,
		PlansModule,
		AditionalServicesModule,
		VendasModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
	],
})
export class AppModule {}
