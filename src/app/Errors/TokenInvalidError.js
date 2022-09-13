import { ApolloError } from 'apollo-server-errors';

class TokenInvalidError extends ApolloError {
  constructor(message) {
    super(message, 'TOKEN_INVALID');

    Object.defineProperty(this, 'name', { value: 'TokenInvalidError' });
  }
}

export default TokenInvalidError;
