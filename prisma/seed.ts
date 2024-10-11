import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	const existingUser = await prisma.user.findUnique({
		where: { email: "usuario51@example.com" },
	});

	const user =
		existingUser ||
		(await prisma.user.create({
			data: {
				email: "usuario51@example.com",
				name: "Usuário Exemplo",
				password: "senhaSegura123",
			},
		}));

	const endereco = await prisma.endereco.create({
		data: {
			logradouro: "Rua Exemplo",
			numero: "123",
			complemento: "Apto 1",
			bairro: "Centro",
			cidade: "Cidade Exemplo",
			estado: "EX",
			cep: "12345-678",
		},
	});

	const existingCliente = await prisma.cliente.findUnique({
		where: { documento: "123.456.789-00" },
	});

	const cliente =
		existingCliente ||
		(await prisma.cliente.create({
			data: {
				nome: "Cliente Exemplo",
				documento: "123.456.789-00",
				enderecoUuid: endereco.uuid,
				telefone: "123456789",
				email: "cliente@example.com",
				dataNascimento: new Date("1990-01-01"),
				tipo: "FISICA",
			},
		}));

	const existingPlano = await prisma.plano.findUnique({
		where: { nome: "Plano Básico" },
	});

	const plano =
		existingPlano ||
		(await prisma.plano.create({
			data: {
				nome: "Plano Básico",
				descricao: "Descrição do plano básico",
				precoBase: 99.99,
			},
		}));

	const servico = await prisma.servico.create({
		data: {
			nome: "Serviço Exemplo",
			descricao: "Descrição do serviço exemplo",
			preco: 29.99,
		},
	});

	console.log({ user, endereco, cliente, plano, servico /* venda */ });
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
