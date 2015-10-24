const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('signup');
});

router.post('/', (req, res, next) => {
  res.render('index', { title: 'Signup Successfull' });
});

module.exports = router;
