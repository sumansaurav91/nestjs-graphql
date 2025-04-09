import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { v4 as uuid } from 'uuid';
import { Post } from './entity/post.entity';

@Injectable()
export class PostsService {
  private posts: Post[] = [];

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: string): Post | undefined {
    return this.posts.find(post => post.id === id);
  }

  create(createPostInput: CreatePostInput): Post {
    const post = {
      id: uuid(),
      ...createPostInput,
    };
    this.posts.push(post);
    return post;
  }

  findPostsByAuthor(authorId: string): Post[] {
    return this.posts.filter(post => post.authorId === authorId);
  }
}
