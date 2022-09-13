import { ApolloError } from 'apollo-server-errors';

class RefreshTokenExpiredError extends ApolloError {
  constructor(message) {
    super(message, 'REFRESH_TOKEN_EXPIRED');

    Object.defineProperty(this, 'name', { value: 'RefreshTokenExpiredError' });
  }
}

export default RefreshTokenExpiredError;
