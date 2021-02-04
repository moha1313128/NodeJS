const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb://moha1313128:dTqwg3jZ6u1yq5PO@cluster0-shard-00-00.ofvtk.mongodb.net:27017,cluster0-shard-00-01.ofvtk.mongodb.net:27017,cluster0-shard-00-02.ofvtk.mongodb.net:27017/shop?ssl=true&replicaSet=atlas-qst63q-shard-0&authSource=admin&retryWrites=true&w=majority",
    // "mongodb+srv://moha1313128:dTqwg3jZ6u1yq5PO@cluster0.ofvtk.mongodb.net/shop?retryWrites=true&w=majority",
    { useUnifiedTopology: true }
  )
    .then((client) => {
      console.log("Connected!");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "Database Not Found";
};

// module.exports = mongoConnect;
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
