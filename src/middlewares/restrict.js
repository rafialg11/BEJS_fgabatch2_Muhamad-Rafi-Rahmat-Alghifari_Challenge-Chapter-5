const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).json({
        status: false,
        message: 'Unauthorized',
        data: null,
      });
    }

    const token = authorization.split(' ')[1];
    const secret = process.env.JWT_SECRET;

    jwt.verify(token, secret, (err, user) => {
      if (err) {
        console.error(err);
        return res.status(401).json({
          status: false,
          message: 'Invalid token',
          data: null,
        });
      }

      req.user = user;
      next();
    });    
  } catch (err) {
    console.error(err);
    res.status(401).json({
      status: false,
      message: 'Unauthorized',
      data: null,
    });
  }
};