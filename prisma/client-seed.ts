import { PrismaClient, TipoCliente } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	// Criar endereços e clientes
	const clientesData = [
		{
			nome: "Cliente Exemplo 1",
			documento: "123.456.789-01",
			telefone: "123456789",
			email: "cliente1@example.com",
			dataNascimento: new Date("1990-01-01"),
			tipo: "FISICA",
			endereco: {
				logradouro: "Rua Exemplo 1",
				numero: "101",
				complemento: "Apto 1",
				bairro: "Centro",
				cidade: "Cidade Exemplo 1",
				estado: "EX",
				cep: "12345-678",
			},
		},
		{
			nome: "Cliente Exemplo 2",
			documento: "123.456.789-02",
			telefone: "987654321",
			email: "cliente2@example.com",
			dataNascimento: new Date("1992-02-02"),
			tipo: "FISICA",
			endereco: {
				logradouro: "Rua Exemplo 2",
				numero: "202",
				complemento: "Apto 2",
				bairro: "Centro",
				cidade: "Cidade Exemplo 2",
				estado: "EX",
				cep: "23456-789",
			},
		},
		{
			nome: "Cliente Exemplo 3",
			documento: "123.456.789-03",
			telefone: "456789123",
			email: "cliente3@example.com",
			dataNascimento: new Date("1995-03-03"),
			tipo: "FISICA",
			endereco: {
				logradouro: "Rua Exemplo 3",
				numero: "303",
				complemento: "Apto 3",
				bairro: "Centro",
				cidade: "Cidade Exemplo 3",
				estado: "EX",
				cep: "34567-890",
			},
		},
		// Adicione mais clientes conforme necessário
	];

	for (const clienteData of clientesData) {
		// Criar endereço
		const endereco = await prisma.endereco.create({
			data: clienteData.endereco,
		});

		// Criar cliente
		await prisma.cliente.create({
			data: {
				nome: clienteData.nome,
				documento: clienteData.documento,
				telefone: clienteData.telefone,
				email: clienteData.email,
				dataNascimento: clienteData.dataNascimento,
				tipo: clienteData.tipo as TipoCliente,
				enderecoUuid: endereco.uuid,
			},
		});
	}

	console.log("Clientes criados com sucesso!");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
