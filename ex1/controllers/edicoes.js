var edicao = require('../models/edicoes')

module.exports.getAllEdicoes = () => {
    return edicao.find().exec();
};

module.exports.getEdicaoByID = (id) => {
    return edicao.findById(id).exec();
};

module.exports.getAllEdicoesByOrg = (organizador) => {
  return edicao.find(
    { organizacao: organizador },
    { anoEdição: 1, organizacao: 1, vencedor: 1, _id: 0 }
  ).exec();
};

module.exports.addEdicao = (newEdicao) => {
  var ed = new edicao(newEdicao);
  return ed.save();
};

module.exports.deleteEdicaoById = (id) => {
  return edicao.findByIdAndDelete(id).exec();
};

module.exports.updateEdicao = (id, edicaoData) => {
  // _id = id
  return edicao.findByIdAndUpdate(id, edicaoData, { new: true, runValidators: true }).exec();
};
