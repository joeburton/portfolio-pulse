import mongodb from 'mongodb';
import 'dotenv/config';

const { MongoClient } = mongodb;

let _db;

const DB_CONNECTION_STRING = process.env.MONGODB || '';

const mongoUtilities = {
  connectToDatabase(callback) {
    MongoClient.connect(
      DB_CONNECTION_STRING,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (_err, client) => {
        _db = client.db('directory');
        console.log('MongoDB Connected');
        callback();
      }
    );
  },
  getDb() {
    console.log('Get DB');
    return _db;
  },
};

export default mongoUtilities;
