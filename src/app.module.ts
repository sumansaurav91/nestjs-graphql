import { Module, ValidationPipe } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { GraphQLSwaggerController } from './graphql-swagger.controller';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      introspection: true,
    }),
    UsersModule,
    PostsModule,
  ],
  controllers: [GraphQLSwaggerController],
})
export class AppModule {}

// 16. Update the main.ts to include full Swagger setup
// Update the bootstrap function in src/main.ts:
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Apply global validation pipe
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  
  // Set up Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('NestJS GraphQL API')
    .setDescription('API documentation for NestJS GraphQL application')
    .setVersion('1.0')
    .addTag('users', 'User operations')
    .addTag('posts', 'Post operations')
    .addTag('GraphQL', 'GraphQL schema and operations')
    .addServer('http://localhost:3000', 'Development Server')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
  console.log(`Application is running on: http://localhost:3000`);
  console.log(`Swagger documentation: http://localhost:3000/api`);
  console.log(`GraphQL Playground: http://localhost:3000/graphql`);
  console.log(`GraphQL Schema documentation: http://localhost:3000/graphql-docs`);
}
