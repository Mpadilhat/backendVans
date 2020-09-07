const { Router } = require("express");
const EmpController = require("./controllers/EmpController");
const SearchAllController = require("./controllers/SearchAllController");
const SearchNameController = require("./controllers/SearchNameController");
const UserController = require("./controllers/UserController");

const routes = Router();

//Query params: request.query (filtros, ordenação, paginação...)
//Route params: request.params (identificar um recurso na alteração ou remoção)
//Body: request.body (dados para criação ou alteração de um registro)

routes.post("/empresas", EmpController.cadastrarEmpresa);
routes.get("/empresas", EmpController.listarEmpresas);
routes.get("/empresas/:id", EmpController.listarEmpresaPorId);

//routes.put("/usuario/:id", EmpController.editar);
//routes.delete("/usuario/:id", EmpController.deletar);

routes.post("/usuarios", UserController.criarUsuario);
routes.get("/usuarios", UserController.listarUsuarios);
routes.get("/usuarios/:id", UserController.listarUserPorId);
routes.post("/usuarios-login", UserController.buscarUsuario);

routes.get("/search-near", SearchAllController.filtroProximo);
routes.get("/search", SearchNameController.filtroNome);
// routes.get("/search", SearchController.filtroPreco);

module.exports = routes;
