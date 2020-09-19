const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect database
connectDB();

// Initialize middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API is running'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
