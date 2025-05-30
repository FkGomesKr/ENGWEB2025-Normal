var mongoose = require('mongoose');

var musicaSchema = new mongoose.Schema({
  id: String,
  link: String,
  título: String,
  país: String,
  compositor: String,
  intérprete: String,
  letra: String
}, { _id: false });

var edicoesSchema = new mongoose.Schema({
  _id: String,
  anoEdição: String,
  musicas: [musicaSchema],
  organizacao: String,
  vencedor: String
}, { versionKey: false });

module.exports = mongoose.model('edicoes', edicoesSchema);
