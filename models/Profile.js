const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
	appuser: {
		type: mongoose.Schema.Types.ObjectId, // to connect to registered Appuser
		ref: 'appuser', // reference to appuser model
	},
	intro: {
		type: String,
	},
	website: {
		type: String,
	},
	location: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('appprofile', ProfileSchema);
