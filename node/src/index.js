const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');

const links = [
  {
    id: 'link-0',
    description: 'Fullstack tutorial for GraphQL',
    url: 'www.howtographql.com',
  },
];

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackerrank Clone`,
    feed: () => links,
    link: (parent, args) => {
      const result = links.find((l) => l.id === args.id);
      return result;
    },
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      const linkIndex = links.findIndex((link) => link.id === args.id);
      if (linkIndex != -1) {
        const link = links[linkIndex];
        links[linkIndex] = {
          id: args.id,
          description: args.description || link.description,
          url: args.url || link.url,
        };
        return links[linkIndex];
      } else {
        return null;
      }
    },
    deleteLink: (parent, args) => {
      const linkIndex = links.findIndex((link) => link.id === args.id);
      if (linkIndex != -1) {
        const link = links[linkIndex];
        links.splice(linkIndex, 1);
        return link;
      } else {
        return null;
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`);
});
