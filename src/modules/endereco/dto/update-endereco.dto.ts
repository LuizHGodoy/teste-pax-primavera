import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { CreateEnderecoDto } from "./create-endereco.dto";

export class UpdateEnderecoDto extends PartialType(CreateEnderecoDto) {
	@ApiProperty({ description: "Logradouro do endereço", required: false })
	@IsOptional()
	@IsString()
	logradouro?: string;

	@ApiProperty({ description: "Número do endereço", required: false })
	@IsOptional()
	@IsString()
	numero?: string;

	@ApiProperty({ description: "Complemento do endereço", required: false })
	@IsOptional()
	@IsString()
	complemento?: string;

	@ApiProperty({ description: "Bairro do endereço", required: false })
	@IsOptional()
	@IsString()
	bairro?: string;

	@ApiProperty({ description: "Cidade do endereço", required: false })
	@IsOptional()
	@IsString()
	cidade?: string;

	@ApiProperty({ description: "Estado do endereço", required: false })
	@IsOptional()
	@IsString()
	estado?: string;

	@ApiProperty({ description: "CEP do endereço", required: false })
	@IsOptional()
	@IsString()
	cep?: string;
}
