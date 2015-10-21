var express = require('express');
var router = express.Router();

var data = [
  {id: 0, lat: 35.656259, lng: 139.723116, name: 'A point'},
  {id: 1, lat: 35.686259, lng: 139.713116, name: 'B point'}
];

router.get('/:id', function(req, res, next) {
  res.json({
    row: data[req.params.id]
  });
});

router.get('/', function(req, res, next) {
  res.json({
    rows: data
  });
});

module.exports = router;
