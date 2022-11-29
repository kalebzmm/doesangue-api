import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './post.model';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, { provide: 'Post', useValue: Post }],
  exports: [PostsService],
  imports: [SequelizeModule.forFeature([Post])]
})
export class PostsModule {}
