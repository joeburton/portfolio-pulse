import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes.js';
import cors from 'cors';

const app = express();

app.set('port', process.env.PORT || 8081);

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/api', routes);

app.listen(app.get('port'), () => {
  console.log(
    'Express app vercel-express-react-demo is running on port',
    app.get('port')
  );
});

export default app;
