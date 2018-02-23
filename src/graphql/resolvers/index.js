import GraphQLDate from 'graphql-date';
import UserResolver from './user-resolver';
import PostResolver from './post-resolver';
import User from '../../models/User';

export default {
  Date: GraphQLDate,
  Post: {
    user: ({ user }) => User.findById(user)
  },
  Query: {
    getPosts: PostResolver.getPosts,
    getPost: PostResolver.getPost,
    me: UserResolver.me,
    getUserPosts: PostResolver.getUserPosts
  },
  Mutation: {
    signup: UserResolver.signup,
    login: UserResolver.login,
    createPost: PostResolver.createPost,
    updatePost: PostResolver.updatePost,
    deletePost: PostResolver.deletePost
  }
};
