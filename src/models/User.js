import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import { hashSync, compareSync } from 'bcrypt-nodejs';

import constants from '../config/constants';

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    avatar: {
      type: String
    },
    password: {
      type: String
    }
  },
  { timestamps: true }
);

userSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
    return next();
  }
  return next();
});

userSchema.methods = {
  _hashPassword(password) {
    return hashSync(password);
  },

  _comparePassword(password) {
    return compareSync(password, this.password);
  },

  _createToken() {
    jwt.sign({ _id: this._id }, constants.JWT_SECRET);
  }
};

export default mongoose.model('User', userSchema);
