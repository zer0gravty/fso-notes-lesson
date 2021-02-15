const mongoose = require('mongoose');
require('dotenv').config();

const DB_NAME = process.env.DB_NAME;
const MONGODB_USER = process.env.MONGODB_USER;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGODB_URI = process.env.MONGODB_URI;
const url = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URI}/${DB_NAME}?retryWrites=true&w=majority`;

console.log('Authenticating with MongoDB...');

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(result => {
    console.log('Connected to MongoDB.');
  })
  .catch((error) => {
    console.log(`Error connecting to MongoDB:\n\t${error}`);
    process.exit(4);
  });

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: 5,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  important: Boolean,
});

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Note', noteSchema);