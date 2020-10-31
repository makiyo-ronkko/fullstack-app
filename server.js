const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect database
connectDB();

// Initialize middleware
app.use(express.json({ extended: false }));

// app.get('/', (req, res) => res.send('API running'));

// Define Routes:
app.use('/users', require('./routes/api/users'));
app.use('/auth', require('./routes/api/auth'));
app.use('/profile', require('./routes/api/profile'));
app.use('/posts', require('./routes/api/posts'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
	// sEt static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
