import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { CreateAditionalServiceDto } from "./create-aditional-service.dto";

export class UpdateAditionalServiceDto extends PartialType(
	CreateAditionalServiceDto,
) {
	@ApiProperty({
		description: "Nome do serviço adicional",
		example: "Limpeza Ultra Profunda",
		required: false,
	})
	@IsOptional()
	@IsString()
	nome?: string;

	@ApiProperty({
		description: "Descrição do serviço adicional",
		example: "Serviço de limpeza completa, profunda e detalhada",
		required: false,
	})
	@IsOptional()
	@IsString()
	descricao?: string;

	@ApiProperty({
		description: "Preço do serviço adicional",
		example: 180.0,
		required: false,
	})
	@IsOptional()
	@IsNumber()
	preco?: number;
}
