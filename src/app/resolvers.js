import {
  DateTimeResolver,
  DateResolver,
  EmailAddressResolver,
  JSONResolver,
  JWTResolver,
  URLResolver,
} from 'graphql-scalars';

const scalarResolver = {
  DateTime: DateTimeResolver,
  Date: DateResolver,
  EmailAddress: EmailAddressResolver,
  JSON: JSONResolver,
  JWT: JWTResolver,
  URL: URLResolver,
};

export default [scalarResolver];
