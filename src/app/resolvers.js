import {
  DateTimeResolver,
  DateResolver,
  EmailAddressResolver,
  JSONResolver,
  JWTResolver,
  URLResolver,
} from 'graphql-scalars';

import Auth from './Auth/index.js';
import AuthToken from './AuthToken/index.js';
import UserAccount from './UserAccount/index.js';

const scalarResolver = {
  DateTime: DateTimeResolver,
  Date: DateResolver,
  EmailAddress: EmailAddressResolver,
  JSON: JSONResolver,
  JWT: JWTResolver,
  URL: URLResolver,
};

export default [
  scalarResolver,
  Auth.resolver,
  AuthToken.resolver,
  UserAccount.resolver,
];
