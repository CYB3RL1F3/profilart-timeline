import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsSchema } from './posts.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Posts', schema: PostsSchema }])
  ],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule { }