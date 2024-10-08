import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAditionalServiceDto {
	@ApiProperty({
		description: "Nome do serviço adicional",
		example: "Limpeza Profunda",
	})
	@IsString()
	@IsNotEmpty()
	nome: string;

	@ApiProperty({
		description: "Descrição do serviço adicional",
		example: "Serviço de limpeza completa e profunda",
	})
	@IsString()
	@IsNotEmpty()
	descricao: string;

	@ApiProperty({
		description: "Preço do serviço adicional",
		example: 150.0,
	})
	@IsNumber()
	@IsNotEmpty()
	preco: number;
}
