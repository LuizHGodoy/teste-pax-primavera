import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreatePlanDto {
	@ApiProperty({
		description: "Nome do plano",
		example: "Plano Básico",
	})
	@IsNotEmpty()
	@IsString()
	nome: string;

	@ApiProperty({
		description: "Descrição do plano",
		example: "Plano com serviços essenciais de limpeza",
	})
	@IsNotEmpty()
	@IsString()
	descricao: string;

	@ApiProperty({
		description: "Preço base do plano",
		example: 99.9,
		minimum: 0,
	})
	@IsNotEmpty()
	@IsNumber()
	@Min(0)
	precoBase: number;
}
