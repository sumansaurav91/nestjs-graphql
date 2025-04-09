import { Resolver, Query, Mutation, Args, ID, ResolveField, Parent } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { CreatePostInput } from './dto/create-post.input';
import { UsersService } from 'src/users/user.service';
import { Post } from './entity/post.entity';

@Resolver(() => Post)
export class PostsResolver {
  constructor(
    private postsService: PostsService,
    private usersService: UsersService,
  ) {}

  @Query(() => [Post], { name: 'posts' })
  findAll() {
    return this.postsService.findAll();
  }

  @Query(() => Post, { name: 'post', nullable: true })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.postsService.findOne(id);
  }

  @Mutation(() => Post)
  createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postsService.create(createPostInput);
  }

  @ResolveField()
  author(@Parent() post: Post) {
    return this.usersService.findOne(post.authorId);
  }
}
