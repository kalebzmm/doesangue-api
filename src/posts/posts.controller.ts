import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiOkResponse,
    ApiBearerAuth,
    ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('posts')
@ApiTags('Post')
@UseGuards(RolesGuard)
export class PostsController {
    constructor(
        private readonly postsService: PostsService,
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({})
    async getAllPosts() {
        return await this.postsService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({})
    async getOnePost(@Param() params) {
        return await this.postsService.findOne(params.id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AuthGuard('jwt'))
    @Roles('admin')
    @ApiBearerAuth()
    @ApiCreatedResponse({})
    async createPost(@Body() createArticleDto: CreatePostDto) {
        return await this.postsService.create(createArticleDto);
    }


    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt'))
    @Roles('admin')
    @ApiBearerAuth()
    @ApiOkResponse({})
    async updateWithAllParams(@Param() params, @Body() createArticleDto: CreatePostDto) {
        return await this.postsService.update(params.id, createArticleDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt'))
    @Roles('admin')
    @ApiBearerAuth()
    @ApiOkResponse({})
    async deleteOnePost(@Param() params) {
        return await this.postsService.delete(params.id);
    }
}
