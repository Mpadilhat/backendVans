const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(
  "mongodb+srv://marcosemaria:marcosemaria@cluster0.bopjj.mongodb.net/minhavan?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

//Avisa pro express entender json em todas as rotas
app.use(express.json());

//Query params: request.query (filtros, ordenação, paginação...)
//Route params: request.params (identificar um recurso na alteração ou remoção)
//Body: request.body (dados para criação ou alteração de um registro)

app.get("/", (request, response) => {
  console.log(request.body);
  return response.json({ message: "Marcoooo000000os" });
});

app.listen(3333);
