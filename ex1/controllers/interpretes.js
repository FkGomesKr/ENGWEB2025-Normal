var edicao = require('../models/edicoes');

module.exports.getInterpretes = () => {
  return edicao.aggregate([
    { $unwind: "$musicas" },
    {
      $group: {
        _id: { nome: "$musicas.intérprete", país: "$musicas.país" }
      }
    },
    {
      $project: {
        _id: 0,
        nome: "$_id.nome",
        país: "$_id.país"
      }
    },
    { $sort: { nome: 1 } }
  ]).exec();
};
