import express from 'express';
import {MySQL} from './db/MySQL';

const app = express()
  .use(express.json())
  .use((_, res) => res.json({
    up: true
  }));

MySQL.init().then(async () => {
  console.log('Successfully initialized MySQL DB!');
  app.listen(process.env.APP_PORT, () => {
    console.log('Server started on port', process.env.APP_PORT);
  });
});