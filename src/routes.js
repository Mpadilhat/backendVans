const { Router } = require("express");
const EmpController = require("./controllers/EmpController");
const routes = Router();

//Query params: request.query (filtros, ordenação, paginação...)
//Route params: request.params (identificar um recurso na alteração ou remoção)
//Body: request.body (dados para criação ou alteração de um registro)

routes.post("/empresas", EmpController.gravarBD);

module.exports = routes;
