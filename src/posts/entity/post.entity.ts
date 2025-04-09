import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class Post {
  @Field(() => ID)
  @ApiProperty({ description: 'Post ID' })
  id: string;

  @Field()
  @ApiProperty({ description: 'Post title' })
  title: string;

  @Field()
  @ApiProperty({ description: 'Post content' })
  content: string;

  @Field(() => ID)
  @ApiProperty({ description: 'Author ID' })
  authorId: string;

  @Field(() => User)
  @ApiProperty({ description: 'Post author', type: () => User })
  author?: User;
}
