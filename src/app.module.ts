import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './app.config';
import { PostsModule } from './posts/posts.module';
console.log(config.db.url);
@Module({
  imports: [
    MongooseModule.forRoot(config.db.url, { 
      useNewUrlParser: true,
      useUnifiedTopology: true
    }),
    PostsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
