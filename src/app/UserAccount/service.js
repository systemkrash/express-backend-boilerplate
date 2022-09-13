import eventEmitter from '../../utils/eventEmitter.js';
import UserAccountEvent from './event.js';

class UserAccountService {
  UserAccountModel;

  constructor(UserAccountModel) {
    this.UserAccountModel = UserAccountModel;

    this.initializeEventListeners();
  }

  initializeEventListeners() {
    eventEmitter.on(UserAccountEvent.USERACCOUNT_TEST, async () => {
      await this.test();
    });
  }

  async test() {
    console.log(`${UserAccountEvent.USERACCOUNT_TEST} fired!!!!`);
  }

  async register({ email, password }) {
    const newUserAccount = this.UserAccountModel({ email, password });

    return await newUserAccount.save();
  }

  async find() {
    return this.UserAccountModel.find().exec();
  }

  async findById(id) {
    return this.UserAccountModel.findById(id).exec();
  }
}

export default UserAccountService;
