import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { EnderecoService } from './endereco.service';

@ApiTags('Endereço')
@Controller('enderecos')
export class EnderecoController {
  constructor(private readonly enderecoService: EnderecoService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo endereço' })
  @ApiResponse({ status: 201, description: 'Endereço criado com sucesso' })
  create(@Body() createEnderecoDto: CreateEnderecoDto) {
    return this.enderecoService.create(createEnderecoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os endereços' })
  @ApiResponse({ status: 200, description: 'Lista de endereços retornada com sucesso' })
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    return this.enderecoService.findAll(page, limit);
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Buscar endereço por UUID' })
  @ApiResponse({ status: 200, description: 'Endereço encontrado' })
  @ApiResponse({ status: 404, description: 'Endereço não encontrado' })
  findOne(@Param('uuid') uuid: string) {
    return this.enderecoService.findOne(uuid);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Atualizar endereço' })
  @ApiResponse({ status: 200, description: 'Endereço atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Endereço não encontrado' })
  update(@Param('uuid') uuid: string, @Body() updateEnderecoDto: UpdateEnderecoDto) {
    return this.enderecoService.update(uuid, updateEnderecoDto);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Remover endereço' })
  @ApiResponse({ status: 200, description: 'Endereço removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Endereço não encontrado' })
  remove(@Param('uuid') uuid: string) {
    return this.enderecoService.remove(uuid);
  }
}