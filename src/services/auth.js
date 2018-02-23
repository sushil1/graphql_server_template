import jwt from 'jsonwebtoken';
import constants from '../config/constants';
import User from '../models/User';

export function decodeToken(token) {
  const arr = token.split(' ');
  if (arr[0] === 'Bearer') {
    return jwt.verify(arr[1], constants.JWT_SECRET);
  }
  throw new Error('invalid token');
}

export async function requireAuth(user) {
  if (!user || !user._id) {
    throw new Error('unauthorized');
  }

  const currentUser = await User.findById(user._id);

  if (!currentUser) {
    throw new Error('unauthorized');
  }
  return currentUser;
}
