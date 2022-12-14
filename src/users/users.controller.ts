import { Controller, Get, Post, Body, UseGuards, Put, Param, Delete, Req, HttpCode, HttpStatus, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import {
  ApiTags,
  ApiOkResponse,
  ApiBearerAuth,
  ApiParam,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthUserDto } from './dto/auth-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('users')
@ApiTags('User')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async authUser(@Body() authUser: AuthUserDto) {
      const user = await this.usersService.authUser(authUser);
      if(user) {
        const accessToken = await this.authService.createAccessToken(user)
        return {accessToken, ...user};
      }
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: UserDto })
  async registerUser(@Body() registerUser: RegisterUserDto) {
      return await this.usersService.create(registerUser);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: UserDto })
  @UseGuards(RolesGuard)
  findMe(@Request() request): Promise<UserDto> {
    return this.usersService.findMe(request.user);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: [UserDto] })
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  findAll(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @ApiOkResponse({ type: UserDto })
  async getUserById(@Param('id') id): Promise<UserDto> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @ApiOkResponse({ type: UserDto })
  update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id,
  ): Promise<UserDto> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('me')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  delete(@Request() request): Promise<UserDto> {
    return this.usersService.delete(request.user.id);
  }
}
