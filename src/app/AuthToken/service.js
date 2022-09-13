import jwt from 'jsonwebtoken';

import config from '../../config/index.js';
import TokenInvalidError from '../Errors/TokenInvalidError.js';
import RefreshTokenExpiredError from '../Errors/RefreshTokenExpiredError.js';
import eventEmitter from '../../utils/eventEmitter.js';

class AuthTokenService {
  constructor(AuthTokenModel) {
    this.AuthTokenModel = AuthTokenModel;

    this.initializeEventListeners();
  }

  initializeEventListeners() {}

  createToken(payload) {
    return jwt.sign(payload, config.auth.jwt.secret, {
      expiresIn: config.auth.jwt.expiresIn,
    });
  }

  createRefreshToken(payload) {
    return jwt.sign(payload, config.auth.jwt.refreshSecret, {
      expiresIn: config.auth.jwt.maxAge,
    });
  }

  async insertToken(browser, platform, ip_address, useraccount_id) {
    console.log('insert Token');
    const token = this.createToken({ useraccount_id });
    const refreshToken = this.createRefreshToken({ useraccount_id });

    try {
      const authToken = new this.AuthTokenModel({
        token,
        refresh_token: refreshToken,
        browser,
        platform,
        ip_address,
        useraccount_id,
      });

      await authToken.save();

      return authToken.token;
    } catch (ex) {
      throw ex;
    }
  }

  async verifyToken(token) {
    const authToken = await this.AuthTokenModel.findOne({ token }).exec();

    if (!authToken) {
      throw new TokenInvalidError('Token is invalid');
    }

    return jwt.verify(token, config.auth.jwt.secret);
  }

  async verifyRefreshToken(token) {
    return jwt.verify(token, config.auth.jwt.refreshSecret);
  }

  async refreshClientToken(clientToken, { browser, platform, ip_address }) {
    const authToken = await this.AuthTokenModel.findOne({
      token: clientToken,
    }).exec();

    if (!authToken) {
      throw new TokenInvalidError('Token is invalid');
    }

    try {
      await this.verifyRefreshToken(authToken.refresh_token);

      const token = this.createToken({
        useraccount_id: authToken.useraccount_id,
      });
      const refresh = this.createRefreshToken({
        useraccount_id: authToken.useraccount_id,
      });

      const newAuthToken = this.AuthTokenModel.create({
        token,
        refresh_token: refresh,
        browser,
        platform,
        ip_address,
        useraccount_id: authToken.useraccount_id,
      });

      // delete previous authtoken
      await authToken.remove();

      return newAuthToken;
    } catch (ex) {
      throw new RefreshTokenExpiredError('Refresh token expired');
    }
  }
}

export default AuthTokenService;
