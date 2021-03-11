require('dotenv').config();

const PORT = process.env.PORT;
const DB_NAME = process.env.DB_NAME;
const MONGODB_USER = process.env.MONGODB_USER;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_LOCAL = `mongodb://localhost:27017/${DB_NAME}`;
const MONGODB_URL = process.env.NODE_ENV !== 'test'
  ? `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URI}/${DB_NAME}?retryWrites=true&w=majority`
  : MONGODB_LOCAL;

module.exports = {
  MONGODB_URL,
  PORT,
};
