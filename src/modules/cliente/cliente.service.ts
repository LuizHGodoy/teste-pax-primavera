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
			throw new HttpException(
				"Erro ao criar cliente ou endereço",
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	findAll() {
		return `This action returns all cliente`;
	}

	findOne(id: number) {
		return `This action returns a #${id} cliente`;
	}

	update(id: number, updateClienteDto: UpdateClienteDto) {
		return `This action updates a #${id} cliente`;
	}

	remove(id: number) {
		return `This action removes a #${id} cliente`;
	}
}
