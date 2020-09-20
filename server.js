const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect database
connectDB();

// Initialize middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running'));

// Define Routes:
app.use('/api/users', require('./routes/api/users'));
//app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
