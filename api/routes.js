import express from 'express';
import mongodb from 'mongodb';
const { ObjectID } = mongodb;
import { connectToDatabase } from './mongoUtilities.js';

const router = express.Router();

import projects from './projects-data.js';

const getCollection = async (collectionName) => {
  let { db } = await connectToDatabase();
  const collection = db.collection(collectionName);

  return collection;
};

router.get('/source', async (_req, res) => {
  try {
    const collection = await getCollection('items');
    const result = await collection.find().sort({ _id: -1 }).toArray();
    res.send(JSON.stringify(result));
  } catch (err) {
    res.status(500).send({ Error: err.toString() });
  }
});

router.post('/auth', async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const users = await getCollection('users');
    const user = await users.findOne({ username: username });

    if (user && user.password === password) {
      req.session.loggedin = true;
      req.session.username = username;
      res.send({
        username: req.session.username,
        success: 'You are logged in',
      });
    } else {
      res
        .status(401)
        .send({ Error: 'Please enter a valid Username and Password!' });
    }
  } catch (err) {
    res.status(500).send({ Error: err.toString() });
  }
});

router.post('/logout', (req, res) => {
  req.session.loggedin = false;
  req.session.username = '';
  res.send({ success: 'You successfully logged out' });
});

router.get('/populate-database', async (req, res) => {
  if (req.session.loggedin) {
    try {
      const collection = await getCollection('items');
      const result = await collection.insertMany(projects, { ordered: true });
      res.send(result);
    } catch (err) {
      res.status(500).send({ Error: err.toString() });
    }
  } else {
    res
      .status(401)
      .send({ Error: 'You are not authorised to access here, please login.' });
  }
});

router.get('/delete-all-items', async (req, res) => {
  if (req.session.loggedin) {
    try {
      const collection = await getCollection('items');
      const result = await collection.drop();
      res.send(result);
    } catch (err) {
      res.status(500).send({ Error: err.toString() });
    }
  } else {
    res
      .status(401)
      .send({ Error: 'You are not authorised to access here, please login.' });
  }
});

router.post('/delete-item', async (req, res) => {
  if (req.session.loggedin) {
    try {
      const collection = await getCollection('items');
      const id = req.body.id;
      const result = await collection.deleteOne({ _id: new ObjectID(id) });
      res.send(JSON.stringify(result));
    } catch (err) {
      res.status(500).send({ Error: err.toString() });
    }
  } else {
    res
      .status(401)
      .send({ Error: 'You are not authorised to access here, please login.' });
  }
});

router.post('/update-item', async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(500).send({ Error: 'No file provided' });
  }

  const imageFile = req.files.logo;
  const item = req.body;

  const collection = await getCollection('items');

  imageFile.mv(`../public/images/${imageFile.name}`, (err) => {
    if (err) {
      return res.status(500).send({ Error: err.toString() });
    }

    try {
      collection.updateOne(
        { _id: new ObjectID(item._id) },
        {
          $set: {
            logo: imageFile.name,
            role: item.role,
            company: item.company,
            description: item.description,
            skills: item.skills,
            class: item.class,
            links: item.links,
          },
        },
        () => {
          collection
            .find()
            .sort({ _id: -1 })
            .toArray((_err, items) => {
              res.send(JSON.stringify(items));
            });
        }
      );
    } catch (err) {
      res.status(500).send({ Error: err.toString() });
    }
  });
});

router.post('/add-item', async (req, res) => {
  if (req.session.loggedin) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(500).send({ Error: 'No file provided' });
    }

    const imageFile = req.files.logo;

    const collection = await getCollection('items');

    imageFile.mv(`../public/images/${imageFile.name}`, (err) => {
      if (err) {
        return res.status(500).send({ Error: err.toString() });
      }

      try {
        collection
          .insertOne({
            ...req.body,
            logo: imageFile.name,
          })
          .then(() => {
            collection
              .find()
              .sort({ _id: -1 })
              .toArray((_err, items) => {
                res.send(JSON.stringify(items));
              });
          });
      } catch (err) {
        res.status(500).send({ Error: err.toString() });
      }
    });
  } else {
    res.status(401).send({
      Error: 'You are not authorised to access here, please login. add-item',
    });
  }
});

router.post('/add-user', async (req, res) => {
  if (req.session.loggedin) {
    try {
      const collection = await getCollection('users');
      collection.insertOne({ ...req.body }).then(() => {
        res.send(JSON.stringify('success'));
      });
    } catch (err) {
      res.status(500).send({ Error: err.toString() });
    }
  } else {
    res
      .status(401)
      .send({ Error: 'You are not authorised to access here, please login.' });
  }
});

router.get('/users', async (req, res) => {
  if (req.session.loggedin) {
    try {
      const collection = await getCollection('users');
      collection.find().toArray((_err, items) => {
        res.send(JSON.stringify(items));
      });
    } catch (err) {
      res.status(500).send({ Error: err.toString() });
    }
  } else {
    res
      .status(401)
      .send({ Error: 'You are not authorised to access here, please login.' });
  }
});

// const processErrorResponse = (res, statusCode, message) => {
//   console.log(`${statusCode} ${message}`);
//   res.status(statusCode).send({
//     error: {
//       status: statusCode,
//       message: message,
//     },
//   });
// };

export default router;
