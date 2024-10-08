import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsArray, IsNumber, IsOptional, IsUUID } from "class-validator";
import { CreateVendaDto } from "./create-venda.dto";

export class UpdateVendaDto extends PartialType(CreateVendaDto) {
	@ApiProperty({ description: "UUID do cliente", required: false })
	@IsOptional()
	@IsUUID()
	clienteUuid?: string;

	@ApiProperty({ description: "UUID do plano", required: false })
	@IsOptional()
	@IsUUID()
	planoUuid?: string;

	@ApiProperty({
		description: "UUIDs dos serviços adicionais",
		type: [String],
		required: false,
	})
	@IsOptional()
	@IsArray()
	@IsUUID("4", { each: true })
	servicosAdicionaisUuids?: string[];

	@ApiProperty({ description: "Valor total da venda", required: false })
	@IsOptional()
	@IsNumber()
	totalVenda?: number;

	@ApiProperty({ description: "Desconto aplicado", required: false })
	@IsOptional()
	@IsNumber()
	descontoAplicado?: number;

	@ApiProperty({ description: "UUID do vendedor", required: false })
	@IsOptional()
	@IsUUID()
	vendedorUuid?: string;
}
