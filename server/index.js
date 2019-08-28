const { GraphQLServer } = require('graphql-yoga');

let users = [];
let idCount = 0;

let posts = [];
let postCount = 0;

const resolvers = {
  Query: {
    users: () => users,
    user: (parent, args) => users.find(us => us.id === args.id),
    posts: () => posts,
    userPosts: (parent, args) => posts.find(pst => pst.userId === args.userId),
  },
  Mutation: {
    createUser: (parent, { name, age }) => {
      const user = {
        id: `user-${idCount++}`,
        name,
        age,
      };
      users.push(user);
      return user;
    },
    createPost: (parent, { date, userId, content }) => {
      const post = {
        id: `post-${idCount++}`,
        date,
        userId,
        content,
      };
      posts.push(post);
      return post;
    }
  },
};

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
