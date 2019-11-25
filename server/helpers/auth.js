var db = require('../models');

exports.signin = function (req, res) {
  db.User.findOne({ username: req.body.username }).then(function (user) {
    user.comparePassword(req.body.password, function (err, isMatch) {
      if (isMatch) {
        res.status(200).json({
          userId: user.id,
          username: user.username,
        });
      } else {
        res.status(400).json({ message: 'Invalid Email/Password.' })
      }
    })
  }).catch(function (err) {
    res.status(400).json({ message: 'Invalid Email/Password' })
  })
};

exports.signup = function (req, res, next) {
  console.log(req.body);
  db.User.create(req.body).then(function (user) {
    res.status(200).json({
      userId: user.id,
      username: user.username,
    });
  }).catch(function (err) {
    res.status(400).json(err);
  });
};

module.exports = exports;
