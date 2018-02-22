require('dotenv').config();

export default {
  PORT: process.env.PORT || 3000,
  DB_URL: process.env.DB_URL,
  GRAPHQL_PATH: '/graphql',
  JWT_SECRET: process.env.JWT_SECRET
};
