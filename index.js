const express = require('express');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const uri = process.env._MONGO_cs_1;

console.log('MongoDB Connection URI:', uri); 



// Connect to MongoDB
mongoose.connect(uri).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err.message);
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('Server listening on port 3000!');
});
