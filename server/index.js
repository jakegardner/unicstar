const { GraphQLServer } = require('graphql-yoga');

let users = [];
let idCount = 0;

const resolvers = {
  Query: {
    users: () => users,
    user: (parent, args) => users.find(us => us.id === args.id),
  },
  Mutation: {
    createUser: (parent, args) => {
       const user = {
        id: `user-${idCount++}`,
        name: args.name,
        age: args.age,
      };
      users.push(user);
      return user;
    }
  },
};

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
