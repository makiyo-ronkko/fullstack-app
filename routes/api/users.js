// Register users
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// User model
const AppUser = require('../../models/User');

// POST users: Register user
router.post(
  '/',
  [
    // check([filed, msg])
    check('name', 'Name is required.').not().isEmpty(),
    check('email', 'Please include a valid email.').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters.'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    // Extracts the validation errors from a request and makes them available in a Result object.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Distructing req.body.name
    const { name, email, password } = req.body;

    try {
      let user = await AppUser.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists.' }] });
      }
      // Get users gravatar
      const avatar = gravatar.url(email, {
        s: '200', //size
        r: 'pg', // rating
        d: 'mm', // default
      });

      // create a new AppUser
      user = new AppUser({
        name,
        email,
        avatar,
        password,
      });
      // Salt is random data that is used as an additional input to a one-way function that hashes data
      const salt = await bcrypt.genSalt(10);
      // Encrypt password
      user.password = await bcrypt.hash(password, salt);
      // Save bcrypted password
      await user.save();

      // Return jsonwebtoken
      //res.send('User registered');

      // get payload which includes user id
      const payload = {
        user: {
          id: user.id, // from mongoose
        },
      };

      // sign token passing payload, secret
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(err.msg);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
