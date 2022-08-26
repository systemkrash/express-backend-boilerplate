import { MongoDataSource } from 'apollo-datasource-mongodb';

class UserAccountDataSource extends MongoDataSource {
  async getUserAccount(userAccountId) {
    return this.findOneById(userAccountId);
  }
}

export default UserAccountDataSource;
