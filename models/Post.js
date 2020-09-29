const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'appuser',
  },
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  caption: {
    type: String,
    required: [true, 'Please enter the caption'],
    trim: true,
  },
  hashtag: {
    type: String,
    lowercase: true,
  },
  likes: [
    {
      user: {
        // to indicate which user clicks like
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('apppost', PostSchema);
