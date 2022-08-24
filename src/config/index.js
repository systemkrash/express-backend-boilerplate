import 'dotenv/config';

export default {
  environment: process.env.NODE_ENV || 'production',
  timezone: process.env.TZ || 'UTC',
  serverType: process.env.SERVER_TYPE || 'express',
  httpPort: process.env.HTTP_PORT || 80,
  httpsPort: process.env.HTTPS_PORT || 443,
  aws: {
    region: process.env.AWS_REGION || 'ap-southeast-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
  minio: {
    accessKeyId: process.env.MINIO_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.MINIO_SECRET_ACCESS_KEY || '',
    endpoint: process.env.MINIO_ENDPOINT || 'http://127.0.0.2',
  },
  database: {
    mongoDB: {
      hostname: process.env.MONGO_DATABASE_HOST || 'localhost',
      port: process.env.MONGO_DATABASE_PORT || 27017,
      databaseName: process.env.MONGO_DATABASE_NAME || '',
      username: process.env.MONGO_DATABASE_USERNAME || '',
      password: process.env.MONGO_DATABASE_PASSWORD || '',
      authDB: process.env.MONGO_DATABASE_AUTH_DB || 'admin',
      uri: process.env.MONGO_URI,
    },
  },
};
