export class PlanEntity {
	uuid: string;
	nome: string;
	descricao: string;
	precoBase: number;

	constructor(partial: Partial<PlanEntity>) {
		Object.assign(this, partial);
	}
}
