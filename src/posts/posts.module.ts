import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';

@Module({
  imports: [UsersModule],
  providers: [PostsResolver, PostsService],
})
export class PostsModule {}
