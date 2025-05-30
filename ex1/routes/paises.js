var express = require('express');
var router = express.Router();
var paises = require('../controllers/paises');

router.get('/', function(req, res, next) {
  if (req.query.papel === 'org') {
    paises.getOrganizadores()
      .then(data => res.status(200).json(data))
      .catch(error => res.status(500).json(error));
  } else if (req.query.papel === 'venc') {
    paises.getVencedores()
      .then(data => res.status(200).json(data))
      .catch(error => res.status(500).json(error));
  } else {
    res.status(400).json({ error: "Query parameter 'papel' must be 'org' or 'venc'" });
  }
});

module.exports = router;
