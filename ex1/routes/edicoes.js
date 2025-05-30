var express = require('express');
var router = express.Router();
var edicao = require('../controllers/edicoes')

// getAllEdicoes with filters
router.get('/', function(req, res, next) {
  if (req.query.org) {
      edicao.getAllEdicoesByOrg(req.query.org)
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).jsonp(error));
  } else {
  edicao.getAllEdicoes()
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).jsonp(error));
  }
});

// getEdicaobyID
router.get('/:id', function(req, res, next) {
  edicao.getEdicaoByID(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).jsonp(error));
});

// addEdicao
router.post('/', (req, res) => {
  edicao.addEdicao(req.body)
    .then(data => res.status(201).json(data))
    .catch(err => res.status(500).json({ error: err.message }));
});

// deleteEdicao
router.delete('/:id', function(req, res, next) {
  edicao.deleteEdicaoById(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).jsonp(error));
});

router.put('/:id', function(req, res, next) {
  const id = req.params.id;
  const edicaoData = req.body;
  // atenção _id = id
  edicoesController.updateEdicao(id, edicaoData)
    .then(updatedEdicao => {
      if (!updatedEdicao) {
        return res.status(404).json({ error: "Edition not found" });
      }
      res.status(200).json(updatedEdicao);
    })
    .catch(error => res.status(500).json(error));
});

module.exports = router;