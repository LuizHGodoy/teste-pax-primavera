import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AditionalServicesService } from './aditional-services.service';
import { CreateAditionalServiceDto } from './dto/create-aditional-service.dto';
import { UpdateAditionalServiceDto } from './dto/update-aditional-service.dto';

@ApiTags('Serviços Adicionais')
@Controller('aditional-services')
export class AditionalServicesController {
  constructor(private readonly aditionalServicesService: AditionalServicesService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo serviço adicional' })
  @ApiResponse({ status: 201, description: 'Serviço adicional criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() createAditionalServiceDto: CreateAditionalServiceDto) {
    return this.aditionalServicesService.create(createAditionalServiceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os serviços adicionais' })
  @ApiResponse({ status: 200, description: 'Lista de serviços adicionais retornada com sucesso' })
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    return this.aditionalServicesService.findAll(page, limit);
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Buscar serviço adicional por UUID' })
  @ApiResponse({ status: 200, description: 'Serviço adicional encontrado' })
  @ApiResponse({ status: 404, description: 'Serviço adicional não encontrado' })
  findOne(@Param('uuid') uuid: string) {
    return this.aditionalServicesService.findOne(uuid);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Atualizar serviço adicional' })
  @ApiResponse({ status: 200, description: 'Serviço adicional atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Serviço adicional não encontrado' })
  update(@Param('uuid') uuid: string, @Body() updateAditionalServiceDto: UpdateAditionalServiceDto) {
    return this.aditionalServicesService.update(uuid, updateAditionalServiceDto);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Remover serviço adicional' })
  @ApiResponse({ status: 200, description: 'Serviço adicional removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Serviço adicional não encontrado' })
  remove(@Param('uuid') uuid: string) {
    return this.aditionalServicesService.remove(uuid);
  }
}