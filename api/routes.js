import express from 'express';
import mongodb from 'mongodb';
import path from 'path';

const router = express.Router();
const { ObjectID } = mongodb;

const __dirname = path.resolve();

import mongoUtilities from './mongoUtilities.js';
import projects from './projects-data.js';

const getCollection = (collectionName) => {
  const db = mongoUtilities.getDb();
  const collection = db.collection(collectionName);

  return collection;
};

router.get('/source', (_req, res) => {
  const collection = getCollection('items');

  try {
    collection
      .find()
      .sort({ _id: -1 })
      .toArray((_err, items) => {
        res.send(JSON.stringify(items));
      });
  } catch (err) {
    console.log(err);
    res.status(500).send({ Error: err.toString() });
  }
});

router.post('/auth', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const users = getCollection('users');

  users.findOne({ username: username }, (_err, user) => {
    if (user && user.password === password) {
      req.session.loggedin = true;
      req.session.username = username;
      res.send({
        username: req.session.username,
        success: 'You are logged in',
      });
    } else {
      res.send({ Error: 'Please enter a valid Username and Password!' });
    }
  });
});

router.post('/logout', function (req, res) {
  req.session.loggedin = false;
  req.session.username = '';
  res.send({ success: 'You successfully logged out' });
});

router.get('/populate-database', (req, res) => {
  if (req.session.loggedin) {
    try {
      const collection = getCollection('items');
      collection.insertMany(projects, { ordered: true }, (_err, result) => {
        res.send(result);
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

router.get('/delete-all-items', (req, res) => {
  if (req.session.loggedin) {
    try {
      const collection = getCollection('items');
      if (collection.length === undefined) {
        res.send('No records');
      } else {
        collection.drop((_err, result) => {
          res.send(result);
        });
      }
    } catch (err) {
      res.status(500).send({ Error: err.toString() });
    }
  } else {
    res
      .status(401)
      .send({ Error: 'You are not authorised to access here, please login.' });
  }
});

router.post('/delete-item', (req, res) => {
  if (req.session.loggedin) {
    try {
      const collection = getCollection('items');
      const id = req.body.id;
      collection.deleteOne({ _id: new ObjectID(id) }).then((response) => {
        res.send(JSON.stringify(response));
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

router.post('/update-item', (req, res) => {
  if (req.session.loggedin) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(500).send({ Error: 'No file provided' });
    }

    const imageFile = req.files.logo;
    const item = req.body;

    console.log(`${__dirname}/build/images/${imageFile.name}`);

    imageFile.mv(`${__dirname}/build/images/${imageFile.name}`, (err) => {
      if (err) {
        return res.status(500).send({ Error: err.toString() });
      }

      try {
        const collection = getCollection('items');

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
  } else {
    res
      .status(401)
      .send({ Error: 'You are not authorised to access here, please login.' });
  }
});

router.post('/add-item', (req, res) => {
  if (req.session.loggedin) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(500).send({ Error: 'No file provided' });
    }

    const imageFile = req.files.logo;

    console.log(`${__dirname}/build/images/${imageFile.name}`);

    imageFile.mv(`${__dirname}/build/images/${imageFile.name}`, (err) => {
      if (err) {
        return res.status(500).send({ Error: err.toString() });
      }

      try {
        const collection = getCollection('items');
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

router.post('/add-user', (req, res) => {
  if (req.session.loggedin) {
    try {
      const collection = getCollection('users');
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

router.get('/users', (req, res) => {
  if (req.session.loggedin) {
    try {
      const collection = getCollection('users');
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
