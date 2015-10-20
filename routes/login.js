var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', function(req, res, next) {
  res.render('index', { title: 'Login Successfull' });
});

module.exports = router;
