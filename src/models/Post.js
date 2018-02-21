import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema({
  title: {
    type: String
  },
  caption: {
    type: String
  }
});

export default mongoose.model('Post', postSchema);
