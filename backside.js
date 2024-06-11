const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://muhammadarhaanpk:suarim@cluster0.tawj6xi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const dataSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
});

const Data = mongoose.model('Data', dataSchema);

app.post('/data', async (req, res) => {
    const { name, age, email } = req.body;
    const newData = new Data({ name, age, email });
    try {
        const savedData = await newData.save();
        res.status(201).json(savedData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/data', async (req, res) => {
    try {
        const data = await Data.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});