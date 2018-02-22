import Post from '../../models/Post';

export default {
  getPosts: (_, args) => Post.find({}).sort({ createdAt: -1 }),
  getPost: (_, { _id }) => Post.findById(_id),

  createPost: (_, args) => Post.create({ ...args }),

  updatePost: (_, { _id, ...rest }) =>
    Post.findByIdAndUpdate(_id, { ...rest }, { new: true }),

  deletePost: async (_, { _id }) => {
    await Post.findByIdAndRemove(_id);
    return {
      message: 'Post Deleted'
    };
  }
};
