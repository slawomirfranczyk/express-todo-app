import express from 'express';

const app = express()
  .use(express.json())
  .use((_, res) => res.json({
    up: true
  }));

app.listen(process.env.APP_PORT, () => {
  console.log('Server started on port', process.env.APP_PORT);
});