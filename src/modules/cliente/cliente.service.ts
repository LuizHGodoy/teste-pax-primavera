import { isValid as cnpjValidator } from "@fnando/cnpj";
import { isValid as cpfValidator } from "@fnando/cpf";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/services/prisma/prisma.service";
import { EnderecoService } from "../endereco/endereco.service";
import { CreateClienteDto } from "./dto/create-cliente.dto";
import { UpdateClienteDto } from "./dto/update-cliente.dto";
import { ClienteEntity } from "./entities/cliente.entity";

@Injectable()
export class ClienteService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly enderecoService: EnderecoService,
	) {}

	async create(createClienteDto: CreateClienteDto): Promise<ClienteEntity> {
		const documento = createClienteDto.documento;
		const isCPF = documento.length === 11;
		const isCNPJ = documento.length === 14;

		if (!isCPF && !isCNPJ) {
			throw new HttpException(
				"Documento deve ter 11 dígitos (CPF) ou 14 dígitos (CNPJ)",
				HttpStatus.BAD_REQUEST,
			);
		}

		if (isCPF && !cpfValidator(documento)) {
			throw new HttpException("CPF inválido", HttpStatus.BAD_REQUEST);
		}

		if (isCNPJ && !cnpjValidator(documento)) {
			throw new HttpException("CNPJ inválido", HttpStatus.BAD_REQUEST);
		}

		const existingCliente = await this.prisma.cliente.findUnique({
			where: { documento: createClienteDto.documento },
		});

		if (existingCliente) {
			throw new HttpException("Cliente já cadastrado", HttpStatus.BAD_REQUEST);
		}

		try {
			const result = await this.prisma.$transaction(async (prisma) => {
				const address = await this.enderecoService.create(
					createClienteDto.endereco,
				);

				const createdCliente = await prisma.cliente.create({
					data: {
						nome: createClienteDto.nome,
						documento: createClienteDto.documento,
						enderecoUuid: address.data.uuid,
						telefone: createClienteDto.telefone,
						email: createClienteDto.email,
						dataNascimento: createClienteDto.dataNascimento,
						tipo: isCPF ? "FISICA" : "JURIDICA",
					},
				});

				return createdCliente;
			});

			return new ClienteEntity(result);
		} catch (error) {
			console.error(error);
			throw new HttpException(
				"Erro ao criar cliente ou endereço",
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async findAll(page = 1, limit = 10): Promise<ClienteEntity[]> {
		if (page < 1) {
			throw new HttpException(
				"A página deve ser maior ou igual a 1",
				HttpStatus.BAD_REQUEST,
			);
		}

		if (limit < 1) {
			throw new HttpException(
				"O limite deve ser maior ou igual a 1",
				HttpStatus.BAD_REQUEST,
			);
		}

		const skip = (page - 1) * limit;

		const clientes = await this.prisma.cliente.findMany({
			skip,
			take: limit,
			include: {
				endereco: true,
			},
		});

		if (clientes.length === 0 && page > 1) {
			throw new HttpException(
				"A página solicitada não contém resultados",
				HttpStatus.NOT_FOUND,
			);
		}

		return clientes.map((cliente) => new ClienteEntity(cliente));
	}

	async findOne(uuid: string): Promise<ClienteEntity> {
		const cliente = await this.prisma.cliente.findUnique({
			where: { uuid },
			include: {
				endereco: true,
			},
		});

		if (!cliente) {
			throw new HttpException("Cliente não encontrado", HttpStatus.NOT_FOUND);
		}

		return new ClienteEntity(cliente);
	}

	async update(
		uuid: string,
		updateClienteDto: UpdateClienteDto,
	): Promise<ClienteEntity> {
		const cliente = await this.prisma.cliente.findUnique({
			where: { uuid },
		});

		if (!cliente) {
			throw new HttpException("Cliente não encontrado", HttpStatus.NOT_FOUND);
		}

		const clientPayload = {
			...updateClienteDto,
			endereco: undefined,
		};

		const enderecoPayload = updateClienteDto.endereco;

		if (enderecoPayload) {
			await this.prisma.endereco.update({
				where: { uuid: cliente.enderecoUuid },
				data: enderecoPayload,
			});
		}

		const updatedCliente = await this.prisma.cliente.update({
			where: { uuid },
			data: clientPayload,
			include: {
				endereco: true,
			},
		});

		return new ClienteEntity(updatedCliente);
	}

	async remove(uuid: string): Promise<void> {
		const cliente = await this.prisma.cliente.findUnique({
			where: { uuid },
		});

		if (!cliente) {
			throw new HttpException("Cliente não encontrado", HttpStatus.NOT_FOUND);
		}

		await this.prisma.cliente.delete({
			where: { uuid },
		});
	}
}
