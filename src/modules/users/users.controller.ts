import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { IsPublic } from "src/common/decorators/is-public.decorator";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "./entities/user-entity";
import { UsersService } from "./users.service";

@ApiTags("Usuario")
@Controller("usuarios")
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @IsPublic()
  @Post("/criar-usuario")
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<Partial<UserEntity>[]> {
    return this.userService.findAll();
  }

  @Get("/:uuid")
  async findOne(@Query() createUserDto: Partial<User>) {
    return this.userService.findOne(createUserDto);
  }  
}
