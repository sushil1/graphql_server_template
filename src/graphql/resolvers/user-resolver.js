import User from '../../models/User';

export default {
  signup: async (_, { fullName, ...rest }) => {
    try {
      const [firstName, ...lastName] = fullName.split(' ');
      const user = await User.create({ firstName, lastName, ...rest });
      return user;
    } catch (err) {
      throw err;
    }
  },
  login: () => {}
};
