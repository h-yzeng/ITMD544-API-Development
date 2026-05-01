import 'dotenv/config';
import http from 'http';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { expressMiddleware } from '@as-integrations/express5';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { createApp } from './app';

async function main() {
  const app = createApp();
  const httpServer = http.createServer(app);

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
  await apolloServer.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(apolloServer),
  );

  const PORT = process.env.PORT ?? 3000;
  await new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve));

  console.log(`REST API:  http://localhost:${PORT}/api`);
  console.log(`GraphQL:   http://localhost:${PORT}/graphql`);
  console.log(`API Docs:  http://localhost:${PORT}/api-docs`);
  console.log(`Health:    http://localhost:${PORT}/health`);
}

main().catch(console.error);
