import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './app.config';
import { PostsModule } from './posts/posts.module';
import { RedisModule } from 'nestjs-redis';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    RedisModule.register({
      name: config.redis.name,
      url: config.redis.url,
    }),
    PostsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
