import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateEnderecoDto {
	@ApiProperty({ description: "Logradouro do endereço" })
	@IsNotEmpty()
	@IsString()
	logradouro: string;

	@ApiProperty({ description: "Número do endereço", required: false })
	@IsNotEmpty()
	@IsString()
	numero: string;

	@ApiProperty({ description: "Complemento do endereço", required: false })
	@IsOptional()
	@IsString()
	complemento?: string;

	@ApiProperty({ description: "Bairro do endereço" })
	@IsNotEmpty()
	@IsString()
	bairro: string;

	@ApiProperty({ description: "Cidade do endereço" })
	@IsNotEmpty()
	@IsString()
	cidade: string;

	@ApiProperty({ description: "Estado do endereço" })
	@IsNotEmpty()
	@IsString()
	estado: string;

	@ApiProperty({ description: "CEP do endereço" })
	@IsNotEmpty()
	@IsString()
	cep: string;
}
