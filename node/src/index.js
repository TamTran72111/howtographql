const { ApolloServer } = require('apollo-server');

const typeDefs = `
  type Query {
    info: String!
    feed: [Link!]!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
`;

const links = [
  {
    id: 'link-0',
    description: 'Fullstack tutorial for GraphQL',
    url: 'www.howtographql.com',
  },
];

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackerrank Clone`,
    feed: () => links,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`);
});
