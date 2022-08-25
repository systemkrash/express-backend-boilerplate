import mongooseLoader from './mongoose.js';
import s3Loader from './s3.js';
import expressLoader from './express.js';
import apolloLoader from './apollo.js';

async function init({ expressApp }) {
  const mongodb = await mongooseLoader();
  console.log('MongoDB Connected');

  const s3 = await s3Loader();
  console.log('File Storage Initialized');

  const express = await expressLoader({ app: expressApp });
  console.log('Express Initialized');

  const apollo = await apolloLoader({ app: expressApp });
  console.log('Apollo GraphQL Initialized');

  return {
    mongodb,
    s3,
    app: express,
    apollo,
  };
}

export default { init };
