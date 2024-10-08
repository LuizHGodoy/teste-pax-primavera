import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateVendaDto } from './dto/create-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';
import { VendasService } from './vendas.service';

@ApiTags('Vendas')
@Controller('vendas')
export class VendasController {
  constructor(private readonly vendasService: VendasService) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova venda' })
  @ApiResponse({ status: 201, description: 'Venda criada com sucesso' })
  create(@Body() createVendaDto: CreateVendaDto) {
    return this.vendasService.create(createVendaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as vendas' })
  @ApiResponse({ status: 200, description: 'Lista de vendas retornada com sucesso' })
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
) {
    return this.vendasService.findAll(page, limit);
}

  @Get(':uuid')
  @ApiOperation({ summary: 'Buscar venda por UUID' })
  @ApiResponse({ status: 200, description: 'Venda encontrada' })
  @ApiResponse({ status: 404, description: 'Venda não encontrada' })
  findOne(@Param('uuid') uuid: string) {
    return this.vendasService.findOne(uuid);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Atualizar venda' })
  @ApiResponse({ status: 200, description: 'Venda atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Venda não encontrada' })
  update(@Param('uuid') uuid: string, @Body() updateVendaDto: UpdateVendaDto) {
    return this.vendasService.update(uuid, updateVendaDto);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Remover venda' })
  @ApiResponse({ status: 200, description: 'Venda removida com sucesso' })
  @ApiResponse({ status: 404, description: 'Venda não encontrada' })
  remove(@Param('uuid') uuid: string) {
    return this.vendasService.remove(uuid);
  }
}