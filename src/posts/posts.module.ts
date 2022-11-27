import { Module } from '@nestjs/common';
import { ArticleController } from './posts.controller';
import { ArticleService } from './posts.service';

import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema } from './schemas/article.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Article', schema: ArticleSchema}]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
