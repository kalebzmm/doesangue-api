import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus, UseGuards, Request } from '@nestjs/common';
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
import { Post as PostModel } from './post.model';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
@ApiTags('Post')
@UseGuards(RolesGuard)
export class PostsController {
    constructor(
        private readonly postsService: PostsService,
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({type: [PostModel]})
    @ApiBearerAuth()
    @Roles('USER')
    async getAllPosts() {
        return this.postsService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({type: PostModel})
    @ApiBearerAuth()
    @Roles('USER')
    async getOnePost(@Param() params) {
        return this.postsService.findOne(params.id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Roles('USER')
    @ApiCreatedResponse({type: PostModel})
    async createPost(@Body() createPostDto: CreatePostDto, @Request() request) {
        return await this.postsService.create(createPostDto, request.user.id);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt'))
    @Roles('ADMIN')
    @ApiBearerAuth()
    @ApiOkResponse({type: PostModel})
    async updateWithAllParams(@Param() params, @Body() updatePostDto: UpdatePostDto) {
        return this.postsService.update(params.id, updatePostDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(AuthGuard('jwt'))
    @Roles('ADMIN')
    @ApiBearerAuth()
    async deleteOnePost(@Param() params) {
        return this.postsService.delete(params.id);
    }
}
