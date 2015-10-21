var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('signup');
});

router.post('/', function(req, res, next) {
  res.render('index', { title: 'Signup Successfull' });
});

module.exports = router;
