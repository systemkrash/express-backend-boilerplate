import UserAccountModel from './model.js';
import eventEmitter from '../../utils/eventEmitter.js';
import UserAccountEvent from './event.js';

class UserAccountService {
  constructor() {
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
}

export default UserAccountService;
