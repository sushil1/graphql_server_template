import Post from '../../models/Post';

export default {
  getPosts: (_, args) => Post.find({}),
  getPost: (_, { _id }) => Post.findById(_id)
};
