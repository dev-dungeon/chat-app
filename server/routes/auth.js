var express = require("express");
var router = express.Router();
var helpers = require('../helpers/auth');

router.post('/signin', helpers.signin);
router.post('/signup', helpers.signup);

module.exports = router;