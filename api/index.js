import express from 'express';
import bodyParser from 'body-parser';

import projects from './projects-data.js';

const app = express();
app.use(bodyParser.json());
app.set('port', process.env.PORT || 8081);

app.get('/api/source', (req, res) => {
  try {
    res.send(projects);
  } catch (err) {
    const errMessage = `${err}`;
    processErrorResponse(res, 500, errMessage);
  }
});

const processErrorResponse = (res, statusCode, message) => {
  console.log(`${statusCode} ${message}`);
  res.status(statusCode).send({
    error: {
      status: statusCode,
      message: message,
    },
  });
};

app.listen(app.get('port'), function () {
  console.log(
    'Express app vercel-express-react-demo is running on port',
    app.get('port')
  );
});

export default app;
