import { ApiProperty } from "@nestjs/swagger";
import { VendaStatus } from "@prisma/client";
import {
	IsArray,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	IsUUID,
} from "class-validator";

export class CreateVendaDto {
	@ApiProperty({ description: "UUID do cliente" })
	@IsNotEmpty()
	@IsUUID()
	clienteUuid: string;

	@ApiProperty({ description: "UUID do plano" })
	@IsNotEmpty()
	@IsUUID()
	planoUuid: string;

	@ApiProperty({ description: "UUIDs dos serviços adicionais", type: [String] })
	@IsOptional()
	@IsArray()
	@IsUUID("4", { each: true })
	servicosAdicionaisUuids?: string[];

	@ApiProperty({ description: "Valor total da venda" })
	@IsNotEmpty()
	@IsNumber()
	totalVenda: number;

	@ApiProperty({ description: "Desconto aplicado" })
	@IsOptional()
	@IsNumber()
	descontoAplicado?: number;

	@ApiProperty({ description: "UUID do vendedor" })
	@IsNotEmpty()
	@IsUUID()
	vendedorUuid: string;

	@ApiProperty({ description: "Status da venda", required: false })
	@IsOptional()
	@IsString()
	status?: VendaStatus;
}
