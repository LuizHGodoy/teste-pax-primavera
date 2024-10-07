import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/services/prisma/prisma.service";
import { CreateEnderecoDto } from "./dto/create-endereco.dto";
import { UpdateEnderecoDto } from "./dto/update-endereco.dto";

@Injectable()
export class EnderecoService {
	constructor(private prisma: PrismaService) {}

	async create(createEnderecoDto: CreateEnderecoDto) {
		const endereco = await this.prisma.endereco
			.create({
				data: createEnderecoDto,
			})
			.catch((error) => {
				if (error instanceof Prisma.PrismaClientKnownRequestError) {
					throw new BadRequestException(
						"Erro ao criar endereço: " + error.message,
					);
				}
				throw new InternalServerErrorException(
					"Erro interno ao criar endereço",
				);
			});

		return {
			status: 201,
			message: "Endereço criado com sucesso",
			data: endereco,
		};
	}

	async findAll() {
		const enderecos = await this.prisma.endereco.findMany();
		return {
			status: 200,
			data: enderecos,
		};
	}

	async findOne(uuid: string) {
		const endereco = await this.prisma.endereco.findUnique({
			where: { uuid },
		});

		if (!endereco) {
			throw new NotFoundException("Endereço não encontrado");
		}

		return {
			status: 200,
			data: endereco,
		};
	}

	async update(uuid: string, updateEnderecoDto: UpdateEnderecoDto) {
		const endereco = await this.prisma.endereco
			.update({
				where: { uuid },
				data: updateEnderecoDto,
			})
			.catch((error) => {
				if (error instanceof Prisma.PrismaClientKnownRequestError) {
					if (error.code === "P2025") {
						throw new NotFoundException("Endereço não encontrado");
					}
				}
				throw new InternalServerErrorException("Erro ao atualizar endereço");
			});

		return {
			status: 200,
			message: "Endereço atualizado com sucesso",
			data: endereco,
		};
	}

	async remove(uuid: string) {
		await this.prisma.endereco
			.delete({
				where: { uuid },
			})
			.catch((error) => {
				if (error instanceof Prisma.PrismaClientKnownRequestError) {
					if (error.code === "P2025") {
						throw new NotFoundException("Endereço não encontrado");
					}
				}
				throw new InternalServerErrorException("Erro ao remover endereço");
			});

		return {
			status: 200,
			message: "Endereço removido com sucesso",
		};
	}
}
