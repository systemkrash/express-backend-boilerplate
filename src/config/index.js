import 'dotenv/config';

export default {
  environment: process.env.NODE_ENV || 'production',
  timezone: process.env.TZ || 'UTC',
  httpPort: process.env.HTTP_PORT || 80,
  httpsPort: process.env.HTTPS_PORT || 443,
  fileStorage: process.env.FILESTORAGE,
  aws: {
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    ses: {
      region: process.env.AWS_SES_REGION,
    },
  },
  minio: {
    accessKeyId: process.env.MINIO_ACCESS_KEY_ID,
    secretAccessKey: process.env.MINIO_SECRET_ACCESS_KEY,
    endpoint: process.env.MINIO_ENDPOINT,
  },
  database: {
    mongoDB: {
      hostname: process.env.MONGO_DATABASE_HOST,
      port: process.env.MONGO_DATABASE_PORT,
      databaseName: process.env.MONGO_DATABASE_NAME,
      username: process.env.MONGO_DATABASE_USERNAME,
      password: process.env.MONGO_DATABASE_PASSWORD,
      authDB: process.env.MONGO_DATABASE_AUTH_DB,
      uri: process.env.MONGO_URI,
    },
  },
  api: {
    restPrefix: process.env.REST_PREFIX || '/rest',
    graphQLPrefix: process.env.GRAPHQL_PREFIX || '/graphql',
  },
  auth: {
    jwt: {
      secret: process.env.AUTH_JWT_SECRET || 'PAQTAkgpS2R8p7ZrxsCDpT7CzyFkJCdx',
      refreshSecret:
        process.env.AUTH_JWT_REFRESH_SECRET ||
        'cqFqPqjYWAD3BwspOpW5FZwZyYUXsPU4',
      expiresIn: process.env.AUTH_JWT_EXPIRES_IN || '8h',
      maxAge: process.env.AUTH_JWT_MAX_AGE || '7d',
      passwordReset: {
        secret:
          process.env.AUTH_JWT_PASSWORD_RESET_SECRET ||
          'T1B2UXHD4LasVbGeCyrmuQRULz7faX9D',
        expiresIn: process.env.AUTH_JWT_PASSWORD_RESET_EXPIRES_IN || '15m',
        maxAge: process.env.AUTH_JWT_PASSWORD_RESET_MAX_AGE || '30m',
      },
    },
    facebook: {
      appId: process.env.FACEBOOK_APP_ID,
      clientToken: process.env.FACEBOOK_APP_CLIENT_TOKEN,
      secret: process.env.FACEBOOK_APP_SECRET,
      graphVersion: process.env.FACEBOOK_GRAPH_VERSION,
      redirectUri: process.env.FACEBOOK_REDIRECT_URI,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUri: process.env.GOOGLE_REDIRECT_URI,
    },
  },
  mail: {
    type: process.env.MAIL_TYPE,
    address: {
      default: process.env.MAIL_ADDRESS_DEFAULT,
      info: process.env.MAIL_ADDRESS_INFO,
      noreply: process.env.MAIL_ADDRESS_NOREPLY,
    },
    smtp: {
      host: process.env.MAIL_SMTP_HOST,
      port: process.env.MAIL_SMTP_PORT,
      secure: process.env.MAIL_SMTP_SECURE,
      auth: {
        user: process.env.MAIL_SMTP_AUTH_USER,
        pass: process.env.MAIL_SMTP_AUTH_PASS,
      },
    },
  },
  emailVerificationToken: {
    secret:
      process.env.EMAIL_VERFICATION_TOKEN_SECRET ||
      'eNYiJrYvybAkb2ZGp0VnhlBfctojEKqP',
    expiresIn: process.env.EMAIL_VERIFICATION_TOKEN_EXPIRES_IN || '1h',
  },
};
