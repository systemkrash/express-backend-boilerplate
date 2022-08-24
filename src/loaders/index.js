import expressLoader from './express.js';
import mongooseLoader from './mongoose.js';

async function init({ expressApp }) {
  const mongodb = await mongooseLoader();
  console.log('MongoDB Connected');
  const express = await expressLoader({ app: expressApp });
  console.log('Express Initialized');

  return {
    app: express,
    mongodb,
  };
}

export default { init };
