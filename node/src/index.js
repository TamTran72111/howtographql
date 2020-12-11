const { ApolloServer, PubSub } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');

const fs = require('fs');
const path = require('path');

const { getUserId } = require('./utils');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Subscription = require('./resolvers/Subscription');
const User = require('./resolvers/User');
const Link = require('./resolvers/Link');
const Vote = require('./resolvers/Vote');

const prisma = new PrismaClient();

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote,
};

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
  resolvers,
  context: ({ req }) => ({
    ...req,
    prisma,
    pubsub,
    userId: req && req.headers.authorization ? getUserId(req) : null,
  }),
});

server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`);
});
