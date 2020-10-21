const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const AppUser = require('../../models/User');

const upload = require('../../middleware/multer');
const cloudinary = require('cloudinary').v2;

// POST /posts: create a post
router.post(
  '/',
  auth,
  upload.single('image'), // req.file is the `image` file
  // upload.fields([
  //   { name: 'image', maxCount: 1 },
  //   { name: 'caption', maxCount: 1 },
  //   { name: 'hashtag', maxCount: 1 },
  // ]),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Loggedin condition with token, which gives an user id
      const user = await AppUser.findById(req.user.id).select('-password'); // no need to return password

      // console.log(req.files['image']);
      console.log(req.body);
      console.log(req.file);

      const newPost = new Post({
        image: req.file.buffer.toString('base64'), // image from body
        name: user.name, // from database
        avatar: user.avatar,
        caption: req.body.caption,
        hashtag: req.body.hashtag,
        user: req.user.id, // from token
      });

      // upload image file to cloudinary
      // const result = await cloudinary.uploader.upload(req.file);
      // newPost.image = result.secure_url;

      const post = await newPost.save(); // Save post object
      res.json(post); // Send back post object as response
    } catch (err) {
      console.log(err.msg);
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
    console.log(err.msg);
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
    console.log(err.msg);
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
    console.log(err.msg);
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
    console.log(err.msg);
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
    console.log(err.msg);
    res.status(500).send('Server Error');
  }
});

// POST /comment/:id create a comment
router.post('/comment/:id', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Loggedin condition with token, which gives an user id
    const user = await AppUser.findById(req.user.id).select('-password'); // no need to return password
    const post = await Post.findById(req.params.id);

    // no model, plain object
    const newComment = {
      text: req.body.text, // text only comes from body
      name: user.name, // from database
      user: req.user.id, // from token
    };

    post.comments.unshift(newComment);
    console.log(newComment);
    console.log(newComment.text);

    await post.save(); // Save post object
    res.json(post.comments); // Send back comments object as response
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// DELETE /comment/:id/:comment_id create a comment
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }

    // Check if user is the one who created the comment
    if (comment.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'User not authorized' });
    }
    // Get remove index
    // indexOf returns the first index at which a given element found in the array
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();
    res.json(post.comments); // return like id + user id who clicked like
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
