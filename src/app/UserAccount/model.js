import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail.js';
import isJWT from 'validator/lib/isJWT.js';

import config from '../../config/index.js';

const { Schema, model } = mongoose;

const userAccountSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      validate: [
        {
          validator: isEmail,
          message: 'Not a valid email address',
        },
      ],
    },
    password: {
      type: String,
      required: true,
      minLength: [6, 'Password must be more than 6 characters'],
    },
    status: {
      type: String,
      default: 'active',
    },
    reset_password_token: {
      type: String,
      validate: [
        {
          validator: isJWT,
          message: 'Not a valid reset password token',
        },
      ],
    },
    verification_token: {
      type: String,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

userAccountSchema.set('toJSON', { getters: true, virtuals: true });
userAccountSchema.set('toObject', { getters: true, virtuals: true });

userAccountSchema.plugin(paginate);
userAccountSchema.plugin(aggregatePaginate);

const UserAccount = model('UserAccount', userAccountSchema);

export default UserAccount;
