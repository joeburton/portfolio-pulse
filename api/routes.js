import express from 'express';
const router = express.Router();

import projects from './projects-data.js';

router.get('/source', (req, res) => {
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

export default router;
