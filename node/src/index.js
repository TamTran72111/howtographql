const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');

const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackerrank Clone`,
    feed: async (parent, args, context) => {
      return context.prisma.link.findMany();
    },
    link: (parent, args, context) => {
      return context.prisma.link.findFirst({
        where: { id: parseInt(args.id) },
      });
    },
  },
  Mutation: {
    post: (parent, args, context) => {
      const newLink = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        },
      });
      return newLink;
    },
    updateLink: async (parent, args, context) => {
      try {
        return await context.prisma.link.update({
          where: { id: parseInt(args.id) },
          data: {
            url: args.url,
            description: args.description,
          },
        });
      } catch (e) {
        return null;
      }
    },
    deleteLink: (parent, args, context) => {
      return context.prisma.link
        .delete({
          where: { id: parseInt(args.id) },
        })
        .catch(() => {
          return null;
        });
    },
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
  resolvers,
  context: {
    prisma,
  },
});

server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`);
});
