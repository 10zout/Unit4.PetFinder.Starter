const express = require('express');
const cors = require('cors');
const pets = require('./data');
const path = require('path');

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());

// GET - / - returns homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Hello world route
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// Get all pets from the database
app.get('/api/v1/pets', (req, res) => {
    res.json(pets);
});

// Get pet by owner with query string
app.get('/api/v1/pets/owner', (req, res) => {
    const owner = req.query.owner;
    if (!owner) {
        return res.status(400).send('Owner query parameter is required');
    }
    const pet = pets.find(pet => pet.owner === owner);
    if (!pet) {
        return res.status(404).send('Pet not found');
    }
    res.json(pet);
});

// Get pet by name
app.get('/api/v1/pets/:name', (req, res) => {
    const name = req.params.name;
    const pet = pets.find(pet => pet.name === name);
    if (!pet) {
        return res.status(404).send('Pet not found');
    }
    res.json(pet);
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
