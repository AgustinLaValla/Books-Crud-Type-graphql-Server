import { ApolloServer } from 'apollo-server';
import { createConnection } from 'typeorm';
import 'reflect-metadata'; // helper library that extends the functionality of TypeScript decorators
import { buildSchema } from 'type-graphql';
import { magenta } from 'colors';
import { BookResolver } from './graphql/resolvers/book/books.resolver';
import { AuthResolver } from './graphql/resolvers/auth/auth.resolver';

const port = process.env.PORT || 4000;

async function main() {
    const connection = await createConnection(); //Create a connection to the database
    const schema = await buildSchema({  //Generate Graphql Schema
        resolvers: [BookResolver, AuthResolver]
    });
    const server = new ApolloServer({
        schema,
        context: ctx => ctx
    });
    await server.listen(port);
    console.log(magenta(`Server on Port: ${port}`));
}

main();