const Empresa = require("../models/Empresa");

module.exports = {
  //gravarBD == 'store' nos controllers
  async cadastrarEmpresa(req, resp) {
    const { id, empresa, email, endereco, latitude, longitude } = req.body;

    //Verificar se já existe empresa cadastrada com aquele nome ou e-mail
    const empresaExiste = await Empresa.findOne({ empresa });
    const emailExiste = await Empresa.findOne({ email });

    //Mais além, evitar cadastro nas mesmas coordenadas
    if (!empresaExiste && !emailExiste) {
      const localizacao = {
        type: "Point",
        coordinates: [longitude, latitude],
      };

      //Cadastra a empresa no Banco de Dados
      const emp = await Empresa.create({
        _id: id,
        empresa,
        email,
        endereco,
        localizacao,
      });

      return resp.json(emp);
    } else {
      return resp.json({
        message: "Esta empresa ou e-mail já estão cadastrados",
      });
    }
  },

  //listarEmpresas == 'index' nos controllers
  async listarEmpresas(req, resp) {
    const Emps = await Empresa.find();

    if (Emps.length === 0) {
      return resp.json({ message: "Não existem empresas cadastradas" });
    } else return resp.json(Emps);
  },

  async listarEmpresaPorId(req, resp) {
    const { id } = req.params;
    await Empresa.findOne({ _id: id }, function (err, result) {
      if (err) {
        resp.json({ message: "Erro ao buscar empresa" });
      } else {
        if (result) resp.json(result);
        else resp.json({ message: "Empresa não encontrada" });
      }
    });
  },

  //editar = 'update' nos controllers
  //async editar(req, resp) {}

  //deletar = 'destroy' nos controllers
  //async deletar(req, resp) {},
};
