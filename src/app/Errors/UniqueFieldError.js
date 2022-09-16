import { ApolloError } from 'apollo-server-errors';

class UniqueFieldError extends ApolloError {
  constructor(message) {
    super(message, 'UNIQUE_FIELD');

    Object.defineProperty(this, 'name', { value: 'UniqueFieldError' });
  }
}

export default UniqueFieldError;
