import Post from '../../models/Post';

export default {
  getPosts: () => Post.find({}).sort({ createdAt: -1 })
};
