import { AuthenticationError, UserInputError } from 'apollo-server-errors';
import eventEmitter from '../../utils/eventEmitter.js';

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


}

export default AuthService;