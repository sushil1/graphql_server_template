import bodyParser from 'body-parser';
import morgan from 'morgan';

import { decodeToken } from '../services/auth';

async function auth(req, res, next) {
  try {
    const token = req.headers.authorization;
    if (token != null) {
      const user = await decodeToken(token);
      req.user = user;
    } else {
      req.user = null;
    }
    return next();
  } catch (err) {
    throw err;
  }
}

export default app => {
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(auth);
};
