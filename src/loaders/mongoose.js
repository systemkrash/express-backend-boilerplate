import mongoose from 'mongoose';

import config from '../config/index.js';

const mongo = {
  hostname: config.database.mongoDB.hostname,
  port: config.database.mongoDB.port,
  database: config.database.mongoDB.databaseName,
  username: config.database.mongoDB.username,
  password: config.database.mongoDB.password,
  authDB: config.database.mongoDB.authDB,
  uri: config.database.mongoDB.uri,
};

async function connect() {
  const connection = mongoose.connect(mongo.uri);
  // const connection = mongoose.connect(
  //   `mongodb://${mongo.username}:${mongo.password}@${mongo.hostname}:${mongo.port}/${mongo.database}?authSource=${mongo.authDB}`
  // );

  if (config.environment !== 'production') {
    mongoose.set('debug', true);
  }

  return connection;
}

async function disconnect() {
  return await mongoose.disconnect();
}

export { disconnect };
export default connect;
