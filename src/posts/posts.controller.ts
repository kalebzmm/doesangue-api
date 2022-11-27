import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiOkResponse,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ArticleService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('posts')
@UseGuards(RolesGuard)
export class ArticleController {
    constructor(
        private readonly articleService: ArticleService,
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({})
    async getAllArticle() {
        return await this.articleService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({})
    async getOneArticles(@Param() params) {
        return await this.articleService.findOne(params.id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AuthGuard('jwt'))
    @Roles('admin')
    @ApiBearerAuth()
    @ApiCreatedResponse({})
    async createArticle(@Body() createArticleDto: CreatePostDto) {
        return await this.articleService.create(createArticleDto);
    }


    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt'))
    @Roles('admin')
    @ApiBearerAuth()
    @ApiOkResponse({})
    async updateWithAllParams(@Param() params, @Body() createArticleDto: CreatePostDto) {
        return await this.articleService.update(params.id, createArticleDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt'))
    @Roles('admin')
    @ApiBearerAuth()
    @ApiOkResponse({})
    async deleteOneArticle(@Param() params) {
        return await this.articleService.delete(params.id);
    }
}
