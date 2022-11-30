import express from 'express';
import cors from 'cors';
import session from 'express-session';

import mongoUtilities from './mongoUtilities.js';
import routes from './routes.js';

const app = express();

app.set('port', process.env.PORT || 8081);

app.use(cors());
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

mongoUtilities.connectToServer(() => {
  app.use('/api', routes);

  app.listen(app.get('port'), () => {
    console.log(
      'Express app vercel-express-react-demo is running on port',
      app.get('port')
    );
  });
});

export default app;
