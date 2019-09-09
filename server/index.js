const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./src/generated/prisma-client')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const APP_SECRET = 'GraphQL!';

function getUserId(context) {
  const Authorization = context.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, APP_SECRET);
    return userId;
  }
  throw new Error('Not authenticated')
}

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
    createUser: async (parent, { email, password, name, age }, context) => {
      return await context.prisma.createUser({
        email,
        password,
        name,
        age,
      });
    },
    createPost: async (parent, { content }, context) => {
      const userId = getUserId(context);
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
    followUser: async (parent, { follow }, context) => {
      const userId = getUserId(context);
      return await context.prisma.updateUser({
        where: { id: userId },
        data: {
          following: {
            connect: { id: follow },
          },
        },
      });
    },
    unfollowUser: async (parent, { unfollow }, context) => {
      const userId = getUserId(context);
      return await context.prisma.updateUser({
        where: { id: userId },
        data: {
          following: {
            delete: { id: unfollow },
          },
        },
      });
    },
    signup: async (parent, args, context, info) => {
      const password = await bcrypt.hash(args.password, 10);
      const user = await context.prisma.createUser({ ...args, password });
      const token = jwt.sign({ userId: user.id }, APP_SECRET);
      return {
        token,
        user,
      };
    },
    login: async (parent, args, context, info) => {
      const user = await context.prisma.user({ email: args.email });
      if (!user) {
        throw new Error('No such user found')
      }
      const valid = await bcrypt.compare(args.password, user.password);
      if (!valid) {
        throw new Error('Invalid password')
      }
      const token = jwt.sign({ userId: user.id }, APP_SECRET);
      return {
        token,
        user,
      };
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: { prisma },
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
