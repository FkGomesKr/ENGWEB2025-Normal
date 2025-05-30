var express = require('express');
var router = express.Router();
var axios = require('axios');

// Home page, list all editions
router.get('/', function(req, res, next) {
  axios.get('http://localhost:25000/edicoes')
    .then(response => {
      res.render('index', {
        title: 'Eurovision - Home',
        slist: response.data,
        page: 'Home'
      });
    })
    .catch(error => {
      res.status(500).render('error', { error: error });
    });
});

router.get('/:id', function(req, res, next) {
  axios.get(`http://localhost:25000/edicoes/${req.params.id}`)
    .then(response => {
      res.render('edicao', {
        title: `Edição | ${req.params.id}`,
        edicao: response.data
      });
    })
    .catch(error => {
      res.status(500).render('error', { error: error });
    });
});

module.exports = router;
