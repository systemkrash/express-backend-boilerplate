import { AuthenticationError, UserInputError } from 'apollo-server-errors';
import jwt from 'jsonwebtoken';

import config from '../../config/index.js';
import EmailUserAccountNotExistsError from '../Errors/EmailUserAccountNotExistsError.js';
import PasswordsMismatchError from '../Errors/PasswordsMismatchError.js';
import UserAccountNotExistsError from '../Errors/UserAccountNotExistsError.js';

class AuthService {
  constructor(UserAccountModel) {
    this.UserAccountModel = UserAccountModel;

    this.initializeEventListeners();
  }

  initializeEventListeners() {}

  async loginAsEmail(email, password) {
    const userAccount = await this.UserAccountModel.findByLogin(email);

    if (!userAccount) {
      throw new UserInputError('No user found with this login credentials');
    }

    const isValid = await userAccount.validatePassword(password);

    if (!isValid) {
      throw new AuthenticationError('Invalid password');
    }

    return userAccount;
  }

  async createResetPasswordToken(payload) {
    return jwt.sign(payload, config.auth.jwt.passwordReset.secret, {
      expiresIn: config.auth.jwt.passwordReset.expiresIn,
    });
  }

  async forgotPassword(email) {
    const userAccount = await this.UserAccountModel.findOne({ email }).exec();

    if (!userAccount) {
      throw new EmailUserAccountNotExistsError(
        'Email address does not exists in our user records'
      );
    }

    try {
      const payload = {
        useraccount_id: userAccount.id,
      };

      const resetPasswordToken = await this.createResetPasswordToken(payload);
      userAccount.reset_password_token = resetPasswordToken;
      await userAccount.save();
      console.log(userAccount.email);

      return {
        email: userAccount.email,
        resetPasswordToken,
      };
    } catch (ex) {
      throw ex;
    }
  }

  async verifyResetPasswordToken(token) {
    return jwt.verify(token, config.auth.jwt.passwordReset.secret);
  }

  async resetPassword(resetToken, password, confirmPassword) {
    try {
      const token = await this.verifyResetPasswordToken(resetToken);
      console.log(password, confirmPassword);
      // check password and passwordConfirm if not equal throw error
      if (password !== confirmPassword) {
        throw new PasswordsMismatchError('Passwords mismatch');
      }

      const userAccount = await this.UserAccountModel.findById(token.useraccount_id).exec();

      if (!userAccount) {
        throw new UserAccountNotExistsError(
          'UserAccount not exists in our records'
        );
      }

      userAccount.reset_password_token = "";
      userAccount.password = password;

      await userAccount.save();

      return userAccount;
    } catch (ex) {
      throw ex;
    }
  }
}

export default AuthService;
