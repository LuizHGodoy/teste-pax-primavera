import { ApiProperty } from "@nestjs/swagger";

export class VendaEntity {
	@ApiProperty()
	uuid: string;

	@ApiProperty()
	clienteUuid: string;

	@ApiProperty()
	planoUuid: string;

	@ApiProperty({ type: [String] })
	servicosUuids: string[];

	@ApiProperty()
	totalVenda: number;

	@ApiProperty()
	descontoAplicado: number;

	@ApiProperty()
	vendedorUuid: string;

	@ApiProperty()
	dataVenda: Date;
}
