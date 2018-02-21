import faker from 'faker';

import User from '../models/User';
import Post from '../models/Post';

const TOTAL_USER = 3;
const POST_COUNT = 3;

export default async () => {
  try {
    await Post.remove();
    await User.remove();

    await Array.from({ length: TOTAL_USER }).forEach(async (_, i) => {
      const user = await User.create({
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: `https://randomuser.me/portraits/women/${i}.jpg`,
        password: '1234'
      });

      await Array.from({ length: POST_COUNT }).forEach(async (_, j) => {
        await Post.create({
          user: user._id,
          caption: faker.hacker.phrase(),
          title: faker.hacker.noun()
        });
      });
    });
  } catch (err) {
    throw err;
  }
};
