const mongoose = require("mongoose");

const SchemaUsuario = new mongoose.Schema({
  foto: String,
  email: String,
  senha: String,
});

module.exports = mongoose.model("Usuario", SchemaUsuario);
