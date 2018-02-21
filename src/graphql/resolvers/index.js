import UserResolver from './user-resolver';
import PostResolver from './post-resolver';

export default {
  getPosts: PostResolver.getPosts,
  getPost: PostResolver.getPost,
  signup: UserResolver.signup,
  login: UserResolver.login
};
