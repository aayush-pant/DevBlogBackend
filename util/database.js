const mongodb = require('mongodb');
MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
    MongoClient.connect(
        "mongodb://localhost:27017/", { useNewUrlParser: true }
        )
        .then(client => {
            console.log('Connected');
            _db = client.db('devblog');
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

getDb = () => {
    if (_db) {
        return _db;
    }
    throw "No database found!"
};

exports.getDb = getDb;
exports.mongoConnect = mongoConnect;