const mongoose = require('mongoose');

const AppUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    //gravator library
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = AppUser = mongoose.model('appuser', AppUserSchema);
// export variable AppUser, model name = 'appuser', Schema is 'AppUserSchema'
