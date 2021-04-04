const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

const routes = require("./routes");
const { setupWebsocket } = require("./websocket");

const app = express();
const server = http.Server(app);

setupWebsocket(server);

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

server.listen(3333);
