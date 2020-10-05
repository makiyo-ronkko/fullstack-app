const express = require('express');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');

const { check, validationResult } = require('express-validator');
const AppProfile = require('../../models/Profile');
const AppUser = require('../../models/User');

// GET /profile: Get current user's profile
router.get('/user', auth, async (req, res) => {
  try {
    const profile = await AppProfile.findOne({
      // user id (mongoose.Schema.Types.ObjectId )comes with token from registered user
      appuser: req.user.id,
    }).populate('appuser', ['name', 'avatar']);
    // populate method adds 'name' and 'avatar' from 'appuser' model into ProfileSchema
    if (!profile) {
      return res
        .status(400)
        .json({ msg: 'Profile does not exist for this user' });
    }
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// POST /profile: Create/update user profile
router.post('/', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // req.body allows to access the JSON data that was sent in the request
  const { intro, website, location } = req.body;

  // build profile object
  const profileFileds = {};

  profileFileds.appuser = req.user.id;
  if (intro) profileFileds.intro = intro;
  if (website) profileFileds.website = website;
  if (location) profileFileds.location = location;

  try {
    let profile = await AppProfile.findOne({
      appuser: req.user.id, // comes from token
    });

    if (profile) {
      // Update and return/save to json format
      profile = await AppProfile.findOneAndUpdate(
        { appuser: req.user.id },
        { $set: profileFileds }, // update profileFields
        { new: true }
      );
      return res.json(profile); // send back to database
    }

    // If no profile, create a new profile
    profile = new AppProfile(profileFileds);
    await profile.save();
    res.json(profile); // create and send to database
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// GET /profile: get all user profiles to public
router.get('/', async (req, res) => {
  try {
    const allProfiles = await AppProfile.find().populate('user', [
      'name',
      'avatar',
    ]);
    res.json(allProfiles);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// GET/profile/user/:user_id get a specific profile to public
router.get('/user/:user_id', async (req, res) => {
  try {
    // req.params.user_id is from url: profile/user/:user_id (user/:user_id = req.params.user_id)
    const profile = await AppProfile.findOne({
      appuser: req.params.user_id,
    }).populate('appuser', ['name', 'avatar']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      //  'ObjectId' = "_id":
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

// DELETE /profile: delete profile, user & posts
router.delete('/', auth, async (req, res) => {
  try {
    // Remove profile
    // id with token { appuser: req.user.id } from 'appuser' model, private with auth middleware
    await AppProfile.findOneAndDelete({ appuser: req.user.id });
    // Remove user
    await AppUser.findOneAndDelete({ _id: req.user.id });
    res.json({ msg: 'User removed' });
    // @todo - remove user posts
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
