'use strong';

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('signup');
});

router.post('/', (req, res) => {
  res.render('index', { title: 'Signup Successfull' });
});

module.exports = router;
