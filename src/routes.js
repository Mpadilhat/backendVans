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
routes.put("/empresas/:id", EmpController.editarEmpresa);
routes.delete("/empresas/:id", EmpController.deletarEmpresa);

routes.post("/usuarios", UserController.criarUsuario);
routes.get("/usuarios", UserController.listarUsuarios);
routes.get("/usuarios/:id", UserController.listarUserPorId);
routes.post("/usuarios-login", UserController.buscarUsuario);
routes.put("/usuarios/:id", UserController.editarUsuario);
routes.delete("/usuarios/:id", UserController.deletarUsuario);

routes.get("/search-near", SearchAllController.filtroProximo);
routes.get("/search", SearchNameController.filtroNome);

module.exports = routes;
