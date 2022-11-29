import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.model';

@Injectable()
export class PostsService {
    constructor(
        @Inject('Post')
        private readonly postsRepository: typeof Post,
    ) { }

    async create(createPostDto: CreatePostDto): Promise<Post> {
        return this.postsRepository.create(createPostDto);
    }

    async findAll(): Promise<any> {
        return this.postsRepository.findAll();
    }

    async findOne(id: string): Promise<Post> {
        return this.postsRepository.findByPk(id);
    }

    async update(id: string, createPostDto: CreatePostDto): Promise<any> {
        return this.postsRepository.update(createPostDto, { where: {id: id} });
    }

    async delete(id: string): Promise<any> {
        return this.postsRepository.destroy({ where: {id: id} });
    }
}
