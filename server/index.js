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
        following: [],
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
    },
    followUser: (parent, { userId, follow }) => {
      let updatedUser;
      users = users.map(us => {
        if (us.id === userId) {
          us.following.push(follow);
          updatedUser = us;
        };
        return us;
      });
      return updatedUser;
    },
    unfollowUser: (parent, { userId, unfollow }) => {
      let updatedUser;
      users = users.map(us => {
        if (us.id === userId) {
          us.following = us.following.filter(fId => fId !== unfollow);
          updatedUser = us;
        };
        return us;
      });
      return updatedUser;
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
