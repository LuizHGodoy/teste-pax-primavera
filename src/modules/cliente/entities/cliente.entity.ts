import { TipoCliente } from "@prisma/client";

export class ClienteEntity {
	uuid: string;
	nome: string;
	documento: string;
	enderecoUuid: string;
	telefone: string;
	email: string;
	dataNascimento: Date;
	tipo: TipoCliente;

	constructor(partial: Partial<ClienteEntity>) {
		Object.assign(this, partial);
	}
}
