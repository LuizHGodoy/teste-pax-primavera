import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/services/prisma/prisma.service";
import { CreateVendaDto } from "./dto/create-venda.dto";
import { UpdateVendaDto } from "./dto/update-venda.dto";

@Injectable()
export class VendasService {
	constructor(private prisma: PrismaService) {}

	async create(createVendaDto: CreateVendaDto) {
		const {
			clienteUuid,
			planoUuid,
			servicosAdicionaisUuids,
			totalVenda,
			descontoAplicado,
			vendedorUuid,
		} = createVendaDto;

		await this.validateRelations(
			clienteUuid,
			planoUuid,
			servicosAdicionaisUuids,
		);

		const venda = await this.prisma.venda.create({
			data: {
				cliente: { connect: { uuid: clienteUuid } },
				plano: { connect: { uuid: planoUuid } },
				servicos: {
					connect: servicosAdicionaisUuids?.map((uuid) => ({ uuid })) || [],
				},
				totalVenda,
				descontoAplicado,
				vendedorUuid,
			},
			include: {
				cliente: true,
				plano: true,
				servicos: true,
			},
		});

		return {
			status: 201,
			message: "Venda criada com sucesso",
			data: venda,
		};
	}

	async findAll() {
		const vendas = await this.prisma.venda.findMany({
			include: {
				cliente: true,
				plano: true,
				servicos: true,
			},
		});
		return {
			status: 200,
			message: "Vendas listadas com sucesso",
			data: vendas,
		};
	}

	async findOne(uuid: string) {
		const venda = await this.prisma.venda.findUnique({
			where: { uuid },
			include: {
				cliente: true,
				plano: true,
				servicos: true,
			},
		});

		if (!venda) {
			throw new NotFoundException("Venda não encontrada");
		}

		return {
			status: 200,
			message: "Venda encontrada com sucesso",
			data: venda,
		};
	}

	async update(uuid: string, updateVendaDto: UpdateVendaDto) {
		if (
			updateVendaDto.clienteUuid ||
			updateVendaDto.planoUuid ||
			updateVendaDto.servicosAdicionaisUuids
		) {
			await this.validateRelations(
				updateVendaDto.clienteUuid,
				updateVendaDto.planoUuid,
				updateVendaDto.servicosAdicionaisUuids,
			);
		}

		const venda = await this.prisma.venda.update({
			where: { uuid },
			data: {
				cliente: updateVendaDto.clienteUuid
					? { connect: { uuid: updateVendaDto.clienteUuid } }
					: undefined,
				plano: updateVendaDto.planoUuid
					? { connect: { uuid: updateVendaDto.planoUuid } }
					: undefined,
				servicos: updateVendaDto.servicosAdicionaisUuids
					? {
							set: updateVendaDto.servicosAdicionaisUuids.map((uuid) => ({
								uuid,
							})),
					  }
					: undefined,
				totalVenda: updateVendaDto.totalVenda,
				descontoAplicado: updateVendaDto.descontoAplicado,
				vendedorUuid: updateVendaDto.vendedorUuid,
			},
			include: {
				cliente: true,
				plano: true,
				servicos: true,
			},
		});

		return {
			status: 200,
			message: "Venda atualizada com sucesso",
			data: venda,
		};
	}

	async remove(uuid: string) {
		await this.prisma.venda.delete({ where: { uuid } });

		return {
			status: 200,
			message: "Venda removida com sucesso",
		};
	}

	private async validateRelations(
		clienteUuid?: string,
		planoUuid?: string,
		servicosAdicionaisUuids?: string[],
	) {
		if (clienteUuid) {
			const cliente = await this.prisma.cliente.findUnique({
				where: { uuid: clienteUuid },
			});
			if (!cliente) {
				throw new BadRequestException("Cliente não encontrado");
			}
		}

		if (planoUuid) {
			const plano = await this.prisma.plano.findUnique({
				where: { uuid: planoUuid },
			});
			if (!plano) {
				throw new BadRequestException("Plano não encontrado");
			}
		}

		if (servicosAdicionaisUuids && servicosAdicionaisUuids.length > 0) {
			const servicos = await this.prisma.servico.findMany({
				where: { uuid: { in: servicosAdicionaisUuids } },
			});
			if (servicos.length !== servicosAdicionaisUuids.length) {
				throw new BadRequestException(
					"Um ou mais serviços adicionais não foram encontrados",
				);
			}
		}
	}
}
