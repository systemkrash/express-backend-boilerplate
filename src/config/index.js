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
};
