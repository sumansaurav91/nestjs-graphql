import { InputType, Field, ID } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field()
  @ApiProperty({ description: 'Post title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field()
  @ApiProperty({ description: 'Post content' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @Field(() => ID)
  @ApiProperty({ description: 'Author ID' })
  @IsNotEmpty()
  @IsUUID()
  authorId: string;
}
