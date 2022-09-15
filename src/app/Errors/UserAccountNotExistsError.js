import { ApolloError } from 'apollo-server-errors';

class UserAccountNotExistsError extends ApolloError {
  constructor(message) {
    super(message, 'USERACCOUNT_NOT_EXISTS');
    Object.defineProperty(this, 'name', {
      value: 'UserAccountNotExistsError'
    }); // Object.defineProperty(this, 'message', { value: 'User Account Not Exists' });
  }

}

export default UserAccountNotExistsError;