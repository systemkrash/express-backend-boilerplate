import { ApolloError } from 'apollo-server-errors';

class EmailUserAccountNotExistsError extends ApolloError {
  constructor(message) {
    super(message, 'EMAIL_USERACCOUNT_NOT_EXISTS');

    Object.defineProperty(this, 'name', { value: 'EmailUserAccountNotExistsError' });
  }
}

export default EmailUserAccountNotExistsError;
