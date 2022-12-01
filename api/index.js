import express from 'express';
import cors from 'cors';
import session from 'express-session';
import fileUpload from 'express-fileupload';

import mongoUtilities from './mongoUtilities.js';
import routes from './routes.js';

const app = express();

app.set('port', process.env.PORT || 8081);

app.use(cors());
app.use(fileUpload());
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);

mongoUtilities.connectToDatabase(() => {
  app.use('/api', routes);

  app.listen(app.get('port'), () => {
    console.log('App is running on port', app.get('port'));
  });
});

export default app;
