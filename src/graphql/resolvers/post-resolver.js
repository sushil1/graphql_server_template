import Post from '../../models/Post';
import { requireAuth } from '../../services/auth';

export default {
  getPosts: async (_, args, { currentUser }) => {
    try {
      await requireAuth(currentUser);
      return Post.find({}).sort({ createdAt: -1 });
    } catch (err) {
      throw err;
    }
  },
  getPost: async (_, { _id }, { currentUser }) => {
    try {
      await requireAuth(currentUser);
      return Post.findById(_id);
    } catch (err) {
      throw err;
    }
  },

  createPost: async (_, args, { currentUser }) => {
    try {
      await requireAuth(currentUser);
      return Post.create({ ...args, user: currentUser._id });
    } catch (err) {
      throw err;
    }
  },

  updatePost: async (_, { _id, ...rest }, { currentUser }) => {
    try {
      await requireAuth(currentUser);
      const post = await Post.findOne({ _id, user: currentUser._id });
      if (post != null) {
        Object.entries(rest).forEach(([key, val]) => {
          post[key] = val;
        });
        return post.save();
      }
      throw new Error('Not found');
    } catch (err) {
      throw err;
    }
  },

  deletePost: async (_, { _id }, { currentUser }) => {
    try {
      await requireAuth(currentUser);
      const post = await Post.findOne({ _id, user: currentUser._id });
      if (post != null) {
        await post.remove();
        return {
          message: 'Post Deleted'
        };
      }
      throw new Error('Not found');
    } catch (err) {
      throw err;
    }
  },

  getUserPosts: async (_, args, { currentUser }) => {
    try {
      await requireAuth(currentUser);
      const posts = await Post.find({ user: currentUser._id }).sort({
        createdAt: -1
      });
      return posts;
    } catch (err) {
      throw err;
    }
  }
};
