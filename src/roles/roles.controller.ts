import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { createRoleDto } from './dto/create-role.dto';
import { createUserRoleDto } from './dto/create-user-role.dto';
import { deleteUserRoleDto } from './dto/delete-user-role.dto';
import { Role } from './roles.model';
import { RolesService } from './roles.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Papeis')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista papéis.',
    type: [Role],
  })
  async getRoles() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Papel encontrado.',
  })
  @ApiResponse({
    status: 404,
    description: 'Papel não encontrado.',
  })
  async getRole(@Param('id') id) {
    const carteira: Role = await this.rolesService.findOne(id);
    if (!carteira) {
      throw new NotFoundException('Papel não encontrado.');
    }
    return carteira;
  }

  @Post()
  @ApiBody({
    type: createRoleDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Papel criado.',
  })
  async createRole(@Body() data: createRoleDto) {
    return this.rolesService.create(data);
  }

  @Post('user')
  @ApiBody({
    type: createUserRoleDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Papel adicionado ao usuário.',
  })
  async createRoleUser(@Body() data: createUserRoleDto) {
    return this.rolesService.addUserRole(data.id_role, data.id_user);
  }

  @Delete('user')
  @ApiBody({
    type: deleteUserRoleDto,
  })
  @ApiResponse({
    status: 204,
    description: 'Papel removido do usuário.',
  })
  async deleteUserRole(@Body() data: deleteUserRoleDto) {
    return this.rolesService.removeUserRole(data.id_role, data.id_user);
  }
}
