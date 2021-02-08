const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// custom
const Note = require('./models/note');

// setup and configurations
const app = express();

app.use(express.json());
const requestLogger = (request, response, next) => {
    console.log('Method: ', request.method);
    console.log('Path: ', request.path);
    console.log('Body: ', request.body);
    console.log('---');
    next();
}
app.use(requestLogger);
app.use(cors());
app.use(express.static('build'));

// routes
app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>');
});

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => response.json(notes))
});

app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id).then(note => response.json(note));
});

app.post('/api/notes', (request, response) => {
    const body = request.body;
    
    if (!body.content) {
        return response.status(400).json({ error: 'content missing' });
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    });

    note.save().then(savedNote => response.json(savedNote));
});

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    notes = notes.filter( note => note.id !== id);
    response.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
});