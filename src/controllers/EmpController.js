const Empresa = require("../models/Empresa");
const { findConnections, sendMessage } = require("../websocket");

module.exports = {
  //gravarBD == 'store' nos controllers
  async cadastrarEmpresa(req, resp) {
    const {
      id,
      foto,
      dataFundacao,
      empresa,
      cnpj,
      contato,
      redeSocial,
      email,
      endereco,
      latitude,
      longitude,
      zonasAtuacao,
      faixaPreco,
      vans,
      onibus,
    } = req.body;

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
        dataFundacao,
        foto,
        empresa,
        cnpj,
        contato,
        redeSocial,
        email,
        endereco,
        localizacao,
        zonasAtuacao,
        faixaPreco,
        vans,
        onibus,
      });

      //Filtrar as conexões pela distância e que tem o nome da empresa buscada
      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        empresa
      );

      sendMessage(sendSocketMessageTo, "novaEmpresa", emp);

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
  async editarEmpresa(req, resp) {
    const { id } = req.params;
    const {
      empresa,
      dataFundacao,
      cnpj,
      redeSocial,
      email,
      contato,
      endereco,
      localizacao,
      zonasAtuacao,
      faixaPreco,
      vans,
      onibus,
    } = req.body;

    await Empresa.updateOne(
      { _id: id },
      {
        $set: req.body,
      },
      function (err, result) {
        if (err) {
          resp.json({ message: "Erro ao atualizar empresa!" });
        } else {
          resp.json({ message: "Empresa atualizada com sucesso!" });
        }
      }
    );
  },

  //deletar = 'destroy' nos controllers
  async deletarEmpresa(req, resp) {
    const { id } = req.params;

    await Empresa.deleteOne(
      { _id: id },

      function (err, result) {
        if (err) {
          resp.json({ message: "Erro ao deletar empresa!" });
        } else {
          resp.json({ message: "Empresa deletada com sucesso!" });
        }
      }
    );
  },

  //editar veúclos
  async editarVeiculos(req, resp) {
    const { id } = req.params;
    const { vans, onibus } = req.body;

    await Empresa.updateOne(
      { _id: id },
      {
        $set: { vans, onibus },
      },
      function (err, result) {
        if (err) {
          resp.json({ message: "Erro ao atualizar veículos!" });
        } else {
          resp.json({ message: "Veículos atualizados com sucesso!" });
        }
      }
    );
  },
};
