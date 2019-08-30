const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./src/generated/prisma-client')

const resolvers = {
  User: {
    posts(parent) {
      return prisma.user({ id: parent.id }).posts()
    },
    following(parent) {
      return prisma.user({ id: parent.id }).following()
    },
  },
  Post: {
    postedBy(parent) {
      return prisma.post({ id: parent.id }).postedBy()
    },
  },
  Query: {
    users: (root, args, context) => context.prisma.users(),
    user: (parent, args, context) => context.prisma.user({ id: args.id }),
    posts: (root, args, context) => context.prisma.posts(),
    userPosts: (parent, args, context) => context.prisma.user({ id: args.id }).posts(),
    userFollowing: (parent, args, context) => context.prisma.user({ id: args.id }).following(),
  },
  Mutation: {
    createUser: async (parent, { name, age }, context) => {
      return await context.prisma.createUser({
        name,
        age,
      });
    },
    createPost: async (parent, { userId, content }, context) => {
      await context.prisma.updateUser({
        where: { id: userId },
        data: {
          posts: {
            create: [{ content }],
            connect: [{ postedBy: userId }],
          },
        },
      });
      return await context.prisma.posts({ where: { postedBy: userId, content } });
    },
    followUser: async (parent, { userId, follow }, context) => {
      return await context.prisma.updateUser({
        where: { id: userId },
        data: {
          following: {
            connect: { id: follow },
          },
        },
      });
    },
    unfollowUser: async (parent, { userId, unfollow }, context) => {
      return await context.prisma.updateUser({
        where: { id: userId },
        data: {
          following: {
            delete: { id: unfollow },
          },
        },
      });
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: { prisma },
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
