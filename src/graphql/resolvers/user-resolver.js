import User from '../../models/User';
import { requireAuth } from '../../services/auth';

export default {
  signup: async (_, { fullName, ...rest }) => {
    try {
      const [firstName, ...lastName] = fullName.split(' ');
      const user = await User.create({ firstName, lastName, ...rest });
      return user._toAuthJSON();
    } catch (err) {
      throw err;
    }
  },
  login: async (_, { email, password }) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not registered');
      }
      if (user && !user._comparePassword(password)) {
        throw new Error('Wrong password');
      }
      return user._toAuthJSON();
    } catch (err) {
      throw err;
    }
  },
  me: async (_, args, { currentUser }) => {
    try {
      const me = await requireAuth(currentUser);
      return me;
    } catch (err) {
      throw err;
    }
  }
};
