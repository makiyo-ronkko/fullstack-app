const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth'); // to protect auth route
const AppUser = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// GET auth: Get auth user with a token
router.get('/', auth, async (req, res) => {
  try {
    const user = await AppUser.findById(req.user.id).select('-password');
    // req.user = decoded.user; req.user.id from token
    console.log(req.user.id);
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Sever error');
  }
});

// POST auth: Login user with authentication with a token
router.post(
  '/',
  [
    check('email', 'Email needs to be valid.').isEmail(),
    check('password', 'Password is required.').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req); //return Result object
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    //User.findOne().then().catch
    try {
      let user = await AppUser.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials.' }] });
      }

      // password = plain text, user.password = encrypted
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials.' }] });
      }

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
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
