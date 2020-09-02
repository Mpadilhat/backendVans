const { Router } = require("express");
const EmpController = require("./controllers/EmpController");
const SearchAllController = require("./controllers/SearchAllController");
const SearchNameController = require("./controllers/SearchNameController");

const routes = Router();

//Query params: request.query (filtros, ordenação, paginação...)
//Route params: request.params (identificar um recurso na alteração ou remoção)
//Body: request.body (dados para criação ou alteração de um registro)

routes.post("/empresas", EmpController.gravarBD);
routes.get("/empresas", EmpController.listarEmpresas);
routes.get("/empresas/:id", EmpController.listarPorId);
routes.post("/usuario", EmpController.buscarUsuario);
routes.put("/usuario/:id", EmpController.editar);
//routes.delete("/usuario/:id", EmpController.deletar);

routes.get("/search-near", SearchAllController.filtroProximo);
routes.get("/search", SearchNameController.filtroNome);
// routes.get("/search", SearchController.filtroPreco);

module.exports = routes;
