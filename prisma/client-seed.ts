import { PrismaClient, TipoCliente } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	const clientesData = [
		{
			nome: "Cliente Exemplo 7",
			documento: "06548757904",
			telefone: "123456789",
			email: "cliente7@example.com",
			dataNascimento: new Date("1990-01-01"),
			tipo: "FISICA",
			endereco: {
				logradouro: "Rua Exemplo 7",
				numero: "101",
				complemento: "Apto 7",
				bairro: "Centro",
				cidade: "Cidade Exemplo 7",
				estado: "EX",
				cep: "12345-678",
			},
		},
		{
			nome: "Cliente Exemplo 8",
			documento: "74127835486",
			telefone: "987654321",
			email: "cliente8@example.com",
			dataNascimento: new Date("1992-02-02"),
			tipo: "FISICA",
			endereco: {
				logradouro: "Rua Exemplo 8",
				numero: "205",
				complemento: "Apto 8",
				bairro: "Centro",
				cidade: "Cidade Exemplo 8",
				estado: "EX",
				cep: "23456-789",
			},
		},
		{
			nome: "Cliente Exemplo 9",
			documento: "16072381014",
			telefone: "456789123",
			email: "cliente9@example.com",
			dataNascimento: new Date("1995-03-03"),
			tipo: "FISICA",
			endereco: {
				logradouro: "Rua Exemplo 9",
				numero: "306",
				complemento: "Apto 9",
				bairro: "Centro",
				cidade: "Cidade Exemplo 9",
				estado: "EX",
				cep: "34567-890",
			},
		},
	];

	for (const clienteData of clientesData) {
		const endereco = await prisma.endereco.create({
			data: clienteData.endereco,
		});

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
