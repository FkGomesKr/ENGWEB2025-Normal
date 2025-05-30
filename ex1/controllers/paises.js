var edicao = require('../models/edicoes');

module.exports.getOrganizadores = () => {
  return edicao.aggregate([
    {
      $group: {
        _id: "$organizacao",
        anos: { $addToSet: "$anoEdição" }
      }
    },
    {
      $project: {
        _id: 0,
        pais: "$_id",
        anos: 1
      }
    },
    {
      $sort: { pais: 1 }
    }
  ]).exec();
};

module.exports.getVencedores = () => {
  return edicao.aggregate([
    {
      $match: { vencedor: { $ne: null } }
    },
    {
      $group: {
        _id: "$vencedor",
        anos: { $addToSet: "$anoEdição" }
      }
    },
    {
      $project: {
        _id: 0,
        pais: "$_id",
        anos: 1
      }
    },
    {
      $sort: { pais: 1 }
    }
  ]).exec();
};