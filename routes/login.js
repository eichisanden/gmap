'use strong';

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', (req, res) => {
  res.render('index', { title: 'Login Successfull' });
});

module.exports = router;
