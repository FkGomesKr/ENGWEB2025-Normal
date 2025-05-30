var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/:pais', function(req, res, next) {
  const pais = req.params.pais;
  const urlEdicoes = `http://localhost:25000/edicoes`;

  axios.get(urlEdicoes)
    .then(response => {
      const edicoes = response.data;

      const participou = [];
      edicoes.forEach(edicao => {
        if (Array.isArray(edicao.musicas)) {
          edicao.musicas.forEach(musica => {
            if (musica.país && musica.país.toLowerCase() === pais.toLowerCase()) {
              participou.push({
                _id: edicao._id,
                anoEdição: edicao.anoEdição,
                nomeMusica: musica.título,
                nomeInterprete: musica.intérprete,
                venceu: (edicao.vencedor && edicao.vencedor.toLowerCase() === pais.toLowerCase()) ? 'Sim' : 'Não'
              });
            }
          });
        }
      });

      const organizou = edicoes
        .filter(e => e.organizacao && e.organizacao.toLowerCase() === pais.toLowerCase())
        .map(e => ({ _id: e._id, anoEdição: e.anoEdição }));

      res.render('pais', {
        title: `País | ${pais}`,
        pais: pais,
        participou: participou,
        organizou: organizou
      });
    })
    .catch(error => {
      res.status(500).render('error', { error: error });
    });
});

module.exports = router;
