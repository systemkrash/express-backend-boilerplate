import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import hidden from 'mongoose-hidden';

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
      type: String
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

userAccountSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await this.generatePasswordHash();
  }

  if (!this.is_verified) {
    this.verification_token = this.generateEmailVerificationToken();
  }

  return next();
});

userAccountSchema.methods.generatePasswordHash = async function () {
  const saltRounds = 10;

  return await bcrypt.hash(this.password, saltRounds);
};

userAccountSchema.methods.generateEmailVerificationToken = function () {
  return jwt.sign(
    { useraccount_id: this.id },
    config.emailVerificationToken.secret,
    {
      expiresIn: config.emailVerificationToken.expiresIn,
    }
  );
};

userAccountSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userAccountSchema.statics.findByLogin = async function (email) {
  const userAccount = await this.findOne({ email });

  return userAccount;
};

userAccountSchema.statics.verifyEmail = async function (verification_token) {
  try {
    const verificationToken = jwt.verify(
      verification_token,
      config.emailVerificationToken.secret
    );

    return verificationToken;
  } catch (e) {
    throw new EmailVerificationTokenError('Verification token expired');
  }
};

userAccountSchema.plugin(paginate);
userAccountSchema.plugin(aggregatePaginate);
userAccountSchema.plugin(hidden());

const UserAccount = model('UserAccount', userAccountSchema);

export default UserAccount;
