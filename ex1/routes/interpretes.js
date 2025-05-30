var express = require('express');
var router = express.Router();
var interpretes = require('../controllers/interpretes');

router.get('/', function(req, res, next) {
  interpretes.getInterpretes()
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json(error));
});

module.exports = router;