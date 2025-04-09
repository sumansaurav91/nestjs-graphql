import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class User {
  @Field(() => ID)
  @ApiProperty({ description: 'User ID' })
  id: string;

  @Field()
  @ApiProperty({ description: 'User name' })
  name: string;

  @Field()
  @ApiProperty({ description: 'User email' })
  email: string;

  @Field({ nullable: true })
  @ApiProperty({ description: 'User bio', required: false })
  bio?: string;
}
