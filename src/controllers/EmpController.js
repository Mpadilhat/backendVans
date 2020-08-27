const Empresa = require("../models/Empresa");

module.exports = {
  //listarEmpresas == 'index' nos controllers
  async listarEmpresas(req, resp) {
    const Emps = await Empresa.find();

    if (Emps.length === 0) {
      return resp.json({ message: "Não existem empresas cadastradas" });
    } else return resp.json(Emps);
  },

  async listarPorId(req, resp) {
    const { id } = req.params;
    await Empresa.findOne({ _id: id }, function (err, result) {
      if (err) {
        resp.json({ message: "Empresa não encontrada" });
      } else resp.json(result);
    });
  },

  //gravarBD == 'store' nos controllers
  async gravarBD(request, response) {
    const { user, empresa, endereco, latitude, longitude } = request.body;
    const email = user.email;

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
        user,
        empresa,
        email,
        endereco,
        localizacao,
      });

      return response.json(emp);
    } else {
      return response.json({
        message: "Esta empresa ou e-mail já estão cadastrados",
      });
    }
  },

  //logar
  async buscarUsuario(req, resp) {
    const { email, senha } = req.body;

    //Testa o email pq não vai poder repetir
    const emailExist = await Empresa.find({
      "user.email": email,
    });

    if (emailExist.length !== 0) {
      await Empresa.find(
        {
          $and: [{ "user.email": email }, { "user.senha": senha }],
        },
        function (err, result) {
          if (err) {
            return resp.json({ message: "Erro ao buscar usuário" });
          } else {
            if (result.length === 0)
              return resp.json({ message: "Senha incorreta!" });
            else return resp.json(result);
          }
        }
      );
    } else {
      return resp.json({ message: "Este usuário não existe" });
    }
  },

  //editar = 'update' nos controllers
  //async editar(req, resp) {}

  //deletar = 'destroy' nos controllers
  //async deletar(req, resp) {},
};
