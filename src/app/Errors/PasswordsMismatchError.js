import { ApolloError } from 'apollo-server-errors';

class PasswordsMismatchError extends ApolloError {
  constructor(message) {
    super(message, 'PASSWORDS_MISMATCH');
    Object.defineProperty(this, 'name', {
      value: 'PasswordsMismatchError'
    });
  }

}

export default PasswordsMismatchError;