import { ApiProperty } from "@nestjs/swagger";
import {
	IsDateString,
	IsEmail,
	IsNotEmpty,
	IsObject,
	IsOptional,
	IsString,
} from "class-validator";
import { CreateEnderecoDto } from "src/modules/endereco/dto/create-endereco.dto";

export class CreateClienteDto {
	@ApiProperty({ description: "Nome do cliente" })
	@IsNotEmpty()
	@IsString()
	nome: string;

	@ApiProperty({ description: "Documento do cliente (CPF ou CNPJ)" })
	@IsNotEmpty()
	@IsString()
	documento: string;

	@ApiProperty({ description: "endereço do cliente" })
	@IsNotEmpty()
	@IsObject()
	endereco: CreateEnderecoDto;

	@ApiProperty({ description: "Telefone do cliente", required: false })
	@IsOptional()
	@IsString()
	telefone?: string;

	@ApiProperty({ description: "Email do cliente" })
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@ApiProperty({
		description: "Data de nascimento do cliente",
		required: false,
	})
	@IsOptional()
	@IsDateString()
	dataNascimento?: Date;
}
