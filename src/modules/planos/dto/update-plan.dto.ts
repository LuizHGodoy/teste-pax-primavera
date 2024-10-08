import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, Min } from "class-validator";
import { CreatePlanDto } from "./create-plan.dto";

export class UpdatePlanDto extends PartialType(CreatePlanDto) {
	@ApiProperty({
		description: "Nome do plano",
		example: "Plano Básico Plus",
		required: false,
	})
	@IsOptional()
	@IsString()
	nome?: string;

	@ApiProperty({
		description: "Descrição do plano",
		example: "Plano com serviços essenciais de limpeza e alguns adicionais",
		required: false,
	})
	@IsOptional()
	@IsString()
	descricao?: string;

	@ApiProperty({
		description: "Preço base do plano",
		example: 119.9,
		minimum: 0,
		required: false,
	})
	@IsOptional()
	@IsNumber()
	@Min(0)
	precoBase?: number;
}
