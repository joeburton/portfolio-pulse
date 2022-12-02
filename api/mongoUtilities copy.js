import mongodb from 'mongodb';
import 'dotenv/config';

const { MongoClient } = mongodb;

const DB_CONNECTION_STRING = process.env.MONGODB || '';

let _db;

if (!DB_CONNECTION_STRING) {
  throw new Error('Please add your Mongo URI to .env.local');
}

export const connectToDatabase = async (callback) => {
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
};

export const getDb = () => {
  console.log('Get DB');
  return _db;
};
