export class ServicoEntity {
	uuid: string;
	nome: string;
	descricao: string;
	preco: number;

	constructor(partial: Partial<ServicoEntity>) {
		Object.assign(this, partial);
	}
}
