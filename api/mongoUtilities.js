import mongodb from 'mongodb';
import 'dotenv/config';

const { MongoClient } = mongodb;

const DB_CONNECTION_STRING = process.env.MONGODB || '';

if (!DB_CONNECTION_STRING) {
  throw new Error('Please add your Mongo URI to .env.local');
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  // check the cached.
  if (cachedClient && cachedDb) {
    // load from cache
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }

  // set the connection options
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  // Connect to cluster
  let client = new MongoClient(DB_CONNECTION_STRING, opts);
  await client.connect();
  let db = client.db('directory');

  // set cache
  cachedClient = client;
  cachedDb = db;

  return {
    client: cachedClient,
    db: cachedDb,
  };
}
