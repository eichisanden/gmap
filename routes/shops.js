'use strong';

const express = require('express');
const router = express.Router();
const yelp = require('node-yelp');

let client = yelp.createClient({
  oauth: {
    'consumer_key': '',
    'consumer_secret': '',
    'token': '',
    'token_secret': ''
  }
});

const data = [
  {id: 0, lat: 35.656259, lng: 139.723116, name: 'A point'},
  {id: 1, lat: 35.686259, lng: 139.713116, name: 'B point'}
];

router.get('/:id', (req, res) => {
  res.json({
    row: data[req.params.id]
  });
});

router.get('/', (req, res) => {
  client.search({
    term: 'food',
    bounds: req.query.swLat + ',' + req.query.swLng + '|' + req.query.neLat + ',' + req.query.swLng,
    limit: 3
  }).then(function (data) {
    console.log(data);
    res.json({
      rows: data
    });
  });
});

module.exports = router;
