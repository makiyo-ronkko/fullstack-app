const express = require('express');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');

const { check, validationResult } = require('express-validator');
const Account = require('../../models/Account');
const AppUser = require('../../models/User');

// GET /account: Get current user's profile
router.get('/profile', auth, async (req, res) => {
  try {
    const account = await Account.findOne({
      // user id (mongoose.Schema.Types.ObjectId )comes with token from registered user
      appuser: req.user.id,
    }).populate('appuser', ['name', 'avatar']);
    // populate method adds 'name' and 'avatar' from 'appuser' model into AccountSchema
    if (!account) {
      return res
        .status(400)
        .json({ msg: 'Profile does not exist for this user' });
    }
    res.json(account);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// POST /account: Create/update user account
router.post('/', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // req.body allows to access the JSON data that was sent in the request
  const { intro, website, location } = req.body;

  // build account object
  const accountFileds = {};

  accountFileds.appuser = req.user.id;
  if (intro) accountFileds.intro = intro;
  if (website) accountFileds.website = website;
  if (location) accountFileds.location = location;

  try {
    let account = await Account.findOne({
      appuser: req.user.id, // comes from token
    });

    if (account) {
      // Update and return/save to json format
      profile = await Account.findOneAndUpdate(
        { appuser: req.user.id },
        { $set: accountFileds }, // update accountFields
        { new: true }
      );
      return res.json(account); // send back to database
    }

    // If no account, create a new Account
    account = new Account(accountFileds);
    await account.save();
    res.json(account); // create and send to database
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// GET /account: get all user profiles to public
router.get('/', async (req, res) => {
  try {
    const allProfiles = await Account.find().populate('user', [
      'name',
      'avatar',
    ]);
    res.json(allProfiles);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// GET/account/user/:user_id get a specific profile to public
router.get('/user/:user_id', async (req, res) => {
  try {
    // req.params.user_id is from url: account/user/:user_id (user/:user_id = req.params.user_id)
    const account = await Account.findOne({
      appuser: req.params.user_id,
    }).populate('appuser', ['name', 'avatar']);

    if (!account) return res.status(400).json({ msg: 'Profile not found' });

    res.json(account);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      //  'ObjectId' = "_id":
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

// DELETE /account: delete profile, user & posts
router.delete('/', auth, async (req, res) => {
  try {
    // Remove profile
    // id with token { appuser: req.user.id } from 'appuser' model, private with auth middleware
    await Account.findOneAndDelete({ appuser: req.user.id });
    // Remove user
    await Account.findOneAndDelete({ _id: req.user.id });
    // @todo - remove user posts
    res.json({ msg: 'User removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
