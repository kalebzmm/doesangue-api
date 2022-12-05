import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './post.model';

@Injectable()
export class PostsService {
    constructor(
        @Inject('Post')
        private readonly postsRepository: typeof Post,
    ) { }

    async create(createPostDto: CreatePostDto, id_user: string): Promise<Post> {
        return this.postsRepository.create({...createPostDto, id_user});
    }

    async findAll(): Promise<any> {
        return this.postsRepository.findAll();
    }

    async findOne(id: string): Promise<Post> {
        return this.postsRepository.findByPk(id);
    }

    async update(id: string, updatePostDto: UpdatePostDto): Promise<any> {
        return this.postsRepository.update(updatePostDto, { where: {id: id} });
    }

    async delete(id: string): Promise<any> {
        return this.postsRepository.destroy({ where: {id: id} });
    }
}
