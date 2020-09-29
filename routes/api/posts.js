const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const Account = require('../../models/Account');
const AppUser = require('../../models/User');

const multer = require('multer');
const upload = multer({
  dest: 'temp/',
  limits: { fileSize: 10 * 1024 * 1024 },
}).single('image');

// POST /posts: create a post
router.post(
  '/',
  [auth, [check('image', 'Image is required').not().isEmpty()]],
  upload,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Loggedin condition with token, which gives an user id
      const user = await AppUser.findById(req.user.id).select('-password'); // no need to return password

      const newPost = new Post({
        image: req.body.image, // text from body
        name: user.name, // from database
        caption: req.body.caption,
        hashtag: req.body.hashtag,
        user: req.user.id, // from token
      });

      const post = await newPost.save(); // Save post object
      res.json(post); // Send back post object as response
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// GET /posts: Get all posts showing to login users
router.get('/', auth, async (req, res) => {
  try {
    // sort {date: -1} will find the latest date of the posts, {date: 1} is default
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// GET /posts/:id : Get post with id showing to login users
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      //  'ObjectId' = "_id": "5f4d2979b309163195202be0"
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// Delete /posts/:id : Delete post with id
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check appuser
    // post.appuser = object id
    // req.user.id = string
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// PUT posts/like/:id : Like a post

router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); // included in url

    // Check if the post has already been clicked like
    // Compare if current user is loggedin user
    // .length >0 already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }
    // unshift to add like to the beginning
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes); // return like id + user id who clicked like
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// PUT posts/dislike/:id : Dislike a post
router.put('/dislike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); // included in url

    // Check if the post has already been clicked like
    // Compare if current user is loggedin user
    // .length === 0 hasnt' been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    // Get remove index
    // indexOf returns the first index at which a given element found in the array
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();
    res.json(post.likes); // return like id + user id who clicked like
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
