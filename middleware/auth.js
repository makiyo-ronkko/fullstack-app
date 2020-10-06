// authentication for login
const jwt = require('jsonwebtoken');
const config = require('config');

// middleware function
module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authentication dedined' });
  }
  try {
    // Decode encrypted token
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // Request object assign to user and assign the value to
    // user payload (user id)
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is invalid.' });
  }
};
