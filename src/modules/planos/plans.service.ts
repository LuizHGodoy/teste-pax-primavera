import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/services/prisma/prisma.service";
import { CreatePlanDto } from "./dto/create-plan.dto";
import { UpdatePlanDto } from "./dto/update-plan.dto";

@Injectable()
export class PlansService {
	constructor(private prisma: PrismaService) {}

	async create(createPlanDto: CreatePlanDto) {
		const plan = await this.prisma.plano
			.create({
				data: createPlanDto,
			})
			.catch((error) => {
				if (error.code === "P2002") {
					throw new BadRequestException("Já existe um plano com este nome");
				}
				throw error;
			});

		return {
			status: 201,
			message: "Plano criado com sucesso",
			data: plan,
		};
	}

	async findAll() {
		const plans = await this.prisma.plano.findMany();
		return {
			status: 200,
			message: "Planos listados com sucesso",
			data: plans,
		};
	}

	async findOne(uuid: string) {
		const plan = await this.prisma.plano.findUnique({
			where: { uuid },
		});

		if (!plan) {
			throw new NotFoundException("Plano não encontrado");
		}

		return {
			status: 200,
			message: "Plano encontrado com sucesso",
			data: plan,
		};
	}

	async update(uuid: string, updatePlanDto: UpdatePlanDto) {
		const plan = await this.prisma.plano
			.update({
				where: { uuid },
				data: updatePlanDto,
			})
			.catch((error) => {
				if (error.code === "P2025") {
					throw new NotFoundException("Plano não encontrado");
				}
				throw error;
			});

		return {
			status: 200,
			message: "Plano atualizado com sucesso",
			data: plan,
		};
	}

	async remove(uuid: string) {
		await this.prisma.plano
			.delete({
				where: { uuid },
			})
			.catch((error) => {
				if (error.code === "P2025") {
					throw new NotFoundException("Plano não encontrado");
				}
				throw error;
			});

		return {
			status: 200,
			message: "Plano removido com sucesso",
		};
	}
}