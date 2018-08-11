const Store = require("./models/Store");
const User = require("./models/User");

const fakeDbData = require("./data.json");

class FakeDb {
  constructor() {
    this.users = fakeDbData.users;
    this.usersDocs = [];
    this.stores = fakeDbData.stores;
  }
  async cleanDb() {
    await User.remove({});
    await Store.remove({});
    return "Finished";
  }
  pushDataToDb() {
    this.users.forEach(user => {
      const newUser = new User(user);
      this.usersDocs.push(newUser);
      newUser.save();
    });

    this.stores.forEach(store => {
      const newStore = new Store(store);
      newStore.author = this.usersDocs[
        Math.floor(Math.random() * Math.floor(this.usersDocs.length))
      ];
      newStore.save();
    });
  }
  seedDb() {
    this.cleanDb().then(() => {
      this.pushDataToDb();
    });
  }
}

module.exports = FakeDb;
