import express from 'express';
import cors from 'cors';
import session from 'express-session';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';

import routes from './routes.js';

const app = express();

app.set('port', process.env.PORT || 8081);

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(cookieParser());

app.use(
  express.urlencoded({
    extended: true,
  })
);

const requestLogger = (request, response, next) => {
  console.log(`${request.method} url:: ${request.url}`);
  next();
};

app.use(requestLogger);

const oneDay = 1000 * 60 * 60 * 24;

app.use(
  session({
    name: 'daffyduck',
    secret: 'topXY_1979Parp',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
  })
);

app.use('/api', routes);

app.listen(app.get('port'), () => {
  console.log('App is running on port', app.get('port'));
});

export default app;
