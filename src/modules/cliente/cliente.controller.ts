import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ClienteEntity } from './entities/cliente.entity';

@ApiTags('Cliente')
@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post('/criar-cliente')
  @ApiOperation({ summary: 'Criar novo cliente' })
  @ApiResponse({ status: 201, description: 'Cliente criado com sucesso' })
  async create(@Body() createClienteDto: CreateClienteDto): Promise<ClienteEntity> {
    return this.clienteService.create(createClienteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os clientes' })
  @ApiResponse({ status: 200, description: 'Lista de clientes retornada com sucesso' })
  async findAll(): Promise<ClienteEntity[]> {
    return this.clienteService.findAll();
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Buscar cliente por UUID' })
  @ApiResponse({ status: 200, description: 'Cliente encontrado' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  async findOne(@Param('uuid') uuid: string): Promise<ClienteEntity> {
    return this.clienteService.findOne(uuid);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Atualizar cliente' })
  @ApiResponse({ status: 200, description: 'Cliente atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  async update(@Param('uuid') uuid: string, @Body() updateClienteDto: UpdateClienteDto): Promise<ClienteEntity> {
    return this.clienteService.update(uuid, updateClienteDto);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Remover cliente' })
  @ApiResponse({ status: 200, description: 'Cliente removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  async remove(@Param('uuid') uuid: string): Promise<void> {
    return this.clienteService.remove(uuid);
  }
}
