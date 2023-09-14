const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const app = express();

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start(); // Wait for the server to start
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  app.listen({ port: PORT }, () =>
    console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`)
  );
}

startServer();
