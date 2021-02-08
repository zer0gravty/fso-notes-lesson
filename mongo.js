const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
}

const USER = '';
const PASSWORD = process.argv[2];
const DB_NAME = '';
const MONGODB_URI = '';

const url = `mongodb+srv://${USER}:${PASSWORD}@${MONGODB_URI}/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(url,
    { useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

const note = new Note({
    content: 'HTML is Easy',
    date: new Date(),
    important: true,
});

// note.save().then(result => {
//     console.log('note saved!');
//     mongoose.connection.close();
// });

Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note);
    });
    mongoose.connection.close();
});