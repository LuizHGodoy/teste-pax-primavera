import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { PlansService } from './plans.service';

@ApiTags('Planos')
@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo plano' })
  @ApiResponse({ status: 201, description: 'Plano criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.plansService.create(createPlanDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os planos' })
  @ApiResponse({ status: 200, description: 'Lista de planos retornada com sucesso' })
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
      return this.plansService.findAll(page, limit);
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Buscar plano por UUID' })
  @ApiResponse({ status: 200, description: 'Plano encontrado' })
  @ApiResponse({ status: 404, description: 'Plano não encontrado' })
  findOne(@Param('uuid') uuid: string) {
    return this.plansService.findOne(uuid);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Atualizar plano' })
  @ApiResponse({ status: 200, description: 'Plano atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Plano não encontrado' })
  update(@Param('uuid') uuid: string, @Body() updatePlanDto: UpdatePlanDto) {
    return this.plansService.update(uuid, updatePlanDto);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Remover plano' })
  @ApiResponse({ status: 200, description: 'Plano removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Plano não encontrado' })
  remove(@Param('uuid') uuid: string) {
    return this.plansService.remove(uuid);
  }
}