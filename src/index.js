const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();

mongoose.connect(
  "mongodb+srv://marcosemaria:marcosemaria@cluster0.bopjj.mongodb.net/minhavan?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

//Avisa pro express entender json em todas as rotas
app.use(express.json());
//Todas as rotas da aplicação cadastradas
app.use(routes);

app.listen(3333);
