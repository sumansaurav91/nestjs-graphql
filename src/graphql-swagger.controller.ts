import { Controller, Get, Res } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@ApiTags('GraphQL')
@Controller('graphql-docs')
export class GraphQLSwaggerController {
  @Get()
  @ApiOperation({ summary: 'GraphQL Schema Documentation' })
  getGraphQLDocs(@Res() res: Response) {
    const schemaPath = path.join(process.cwd(), 'src/schema.gql');
    
    // Check if schema file exists
    if (fs.existsSync(schemaPath)) {
      const schema = fs.readFileSync(schemaPath, 'utf8');
      
      // Create a simple HTML page with GraphQL schema
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>GraphQL Schema</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/graphiql/1.5.0/graphiql.min.css" />
            <style>
              body { margin: 0; padding: 20px; font-family: sans-serif; }
              pre { background-color: #f5f5f5; padding: 15px; border-radius: 4px; overflow: auto; }
            </style>
          </head>
          <body>
            <h1>GraphQL Schema</h1>
            <p>You can explore the GraphQL API using the <a href="/graphql" target="_blank">GraphQL Playground</a>.</p>
            <h2>Schema Definition</h2>
            <pre>${schema}</pre>
          </body>
        </html>
      `;
      
      res.type('html').send(html);
    } else {
      res.status(404).send('GraphQL schema file not found. Make sure to start the application first.');
    }
  }
}
