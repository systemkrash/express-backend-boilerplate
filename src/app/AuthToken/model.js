import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';

import isJWT from 'validator/lib/isJWT.js';

import config from '../../config/index.js';

const { Schema, model } = mongoose;

dayjs.extend(duration);

const authTokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
      validate: [{ validator: isJWT, message: 'Not a valid JWT token' }],
      index: true,
    },
    refresh_token: {
      type: String,
      required: true,
      validate: [{ validator: isJWT, message: 'Not a valid JWT token' }],
    },
    browser: {
      type: String,
    },
    platform: {
      type: String,
    },
    ip_address: {
      type: String,
    },
    expires_at: {
      type: Date,
      default: () =>
        dayjs()
          .add(
            Number(config.auth.jwt.maxAge.substring(0, 1)),
            config.auth.jwt.maxAge.substring(1, config.auth.jwt.maxAge.length)
          )
          .toDate(),
      expires: dayjs
        .duration(
          Number(config.auth.jwt.maxAge.substring(0, 1)),
          config.auth.jwt.maxAge.substring(1, config.auth.jwt.maxAge.length)
        )
        .asSeconds(),
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

authTokenSchema.set('toJSON', { getters: true, virtuals: true });
authTokenSchema.set('toObject', { getters: true, virtuals: true });

authTokenSchema.plugin(paginate);
authTokenSchema.plugin(aggregatePaginate);

const AuthToken = model('AuthToken', authTokenSchema);

export default AuthToken;
