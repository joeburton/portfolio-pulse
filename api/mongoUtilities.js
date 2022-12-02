import mongodb from 'mongodb';
import 'dotenv/config';

const { MongoClient } = mongodb;

let _db;

const DB_CONNECTION_STRING = process.env.MONGODB_URI || '';

const mongoUtilities = {
  connectToDatabase() {
    MongoClient.connect(
      DB_CONNECTION_STRING,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (_err, client) => {
        _db = client.db('directory');
        console.log('MongoDB Connected');
      }
    );
  },
  getDb() {
    console.log('Get DB');
    return _db;
  },
};

export default mongoUtilities;
