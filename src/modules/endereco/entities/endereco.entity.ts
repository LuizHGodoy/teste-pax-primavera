export class EnderecoEntity {
	uuid: string;
	logradouro: string;
	numero: string;
	complemento?: string;
	bairro: string;
	cidade: string;
	estado: string;
	cep: string;

	constructor(partial: Partial<EnderecoEntity>) {
		Object.assign(this, partial);
	}
}
