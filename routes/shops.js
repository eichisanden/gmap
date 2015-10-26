'use strong';

const express = require('express');
const router = express.Router();
const yelp = require('node-yelp');

let client = yelp.createClient({
  oauth: {

  }
});

router.get('/:id', (req, res) => {
  client.business(req.params.id, {
    'cc': 'JP',
    lang: 'ja'
  }).then(function (data) {
    console.log(data);
    res.json({
      row: data
    });
  });
});

router.get('/', (req, res) => {
  client.search({
    bounds: req.query.swLat + ',' + req.query.swLng + '|' + req.query.neLat + ',' + req.query.neLng,
    //bounds: '35.787198,139.608562|35.789634,139.614055',
    cc: 'JP',
    lang: 'ja',
    limit: 3
  }).then(function (data) {
    console.log(data);
    res.json({
      rows: data.businesses
    });
  });
});

module.exports = router;
