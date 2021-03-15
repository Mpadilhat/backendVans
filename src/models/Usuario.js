const mongoose = require("mongoose");

const SchemaUsuario = new mongoose.Schema({
  email: String,
  senha: String,
  foto: String,
});

module.exports = mongoose.model("Usuario", SchemaUsuario);
