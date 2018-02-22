import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import { hashSync, compareSync } from 'bcrypt-nodejs';

import constants from '../config/constants';

const userSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      index: true,
      unique: true
    },
    firstName: String,
    lastName: String,
    avatar: String,
    password: {
      type: String,
      required: true
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
    return jwt.sign({ _id: this._id }, constants.JWT_SECRET);
  },

  _toAuthJSON() {
    return {
      email: this.email,
      token: this._createToken()
    };
  }
};

export default mongoose.model('User', userSchema);
