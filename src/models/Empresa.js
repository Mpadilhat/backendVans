const mongoose = require("mongoose");
const PointSchema = require("./utils/PointSchema");

const SchemaEmpresa = new mongoose.Schema({
  foto: String,
  empresa: String,
  cnpj: Number,
  contato: String,
  redeSocial: String,
  email: String,
  endereco: [String],
  localizacao: {
    type: PointSchema,
    index: "2dsphere",
  },
  zonasAtuacao: String,
  faixaPreco: [Number],
  vans: [String],
  onibus: [String],
});

module.exports = mongoose.model("Empresa", SchemaEmpresa);
