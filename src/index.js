import express from 'express';
import { createServer } from 'http';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { execute } from 'graphql';

require('dotenv').config();

import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';

import './config/db';
import constants from './config/constants';
import middlewares from './config/middlewares';

import mocks from './mocks';

const app = express();
const graphQLServer = createServer(app);

middlewares(app);

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: constants.GRAPHQL_PATH
  })
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

app.use(
  constants.GRAPHQL_PATH,
  graphqlExpress({
    schema
  })
);

mocks().then(() => {
  graphQLServer.listen(constants.PORT, err => {
    if (err) {
      console.err(err);
    } else {
      console.log(`
      ====== App running on ${constants.PORT}
      ====== ${process.env.NODE_ENV} ======`);
    }
  });
});
