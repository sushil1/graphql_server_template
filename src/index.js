import express from 'express';

require('dotenv').config();

import './config/db';
import constants from './config/constants';
import middlewares from './config/middlewares';

const app = express();

middlewares(app);

app.listen(constants.PORT, err => {
  if (err) console.err(err);

  console.log(`
    ====== App running on ${constants.PORT}
    ====== ${process.env.NODE_ENV} ======`);
});
