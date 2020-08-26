const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");

const app = express();

mongoose.connect(
  "mongodb+srv://marcosemaria:marcosemaria@cluster0.bopjj.mongodb.net/minhavan?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

//Permite quaisquer acessos externos (fora do localhost ou da rota que o server está rodando)
app.use(cors());
//Avisa pro express entender json em todas as rotas
app.use(express.json());
//Todas as rotas da aplicação cadastradas
app.use(routes);

app.listen(3333);
