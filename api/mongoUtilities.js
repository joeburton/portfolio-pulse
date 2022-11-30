import mongodb from 'mongodb';
import config from 'config';

const { MongoClient } = mongodb;

const production = config.env === 'production' ? true : false;

let url;
let _db;

if (production) {
  // mongodb+srv://username:password@cluster0-dhtvx.mongodb.net/test?retryWrites=true&w=majority
  url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-dhtvx.mongodb.net/directory?retryWrites=true&w=majority`;
} else {
  url =
    'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0';
}

const mongoUtilities = {
  connectToServer(callback) {
    MongoClient.connect(
      url,
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
