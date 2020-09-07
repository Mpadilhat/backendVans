const Usuario = require("../models/Usuario");

module.exports = {
  async criarUsuario(req, resp) {
    const { email, senha } = req.body;

    //Verificar se já existe usuario cadastrado com aquele e-mail
    const emailExist = await Usuario.find({ email });

    if (!emailExist || emailExist.length === 0) {
      //Cadastra a usuario no Banco de Dados
      const user = await Usuario.create({
        email,
        senha,
      });

      return resp.json(user);
    } else {
      return resp.json({
        message: "Este e-mail já está cadastrado!",
      });
    }
  },

  async listarUsuarios(req, resp) {
    const Users = await Usuario.find();

    if (Users.length === 0) {
      return resp.json({ message: "Não existem usuarios cadastrados" });
    } else return resp.json(Users);
  },

  async listarUserPorId(req, resp) {
    const { id } = req.params;
    await Usuario.findOne({ _id: id }, function (err, result) {
      if (err) {
        resp.json({ message: "Usuário não encontrado" });
      } else resp.json(result);
    });
  },

  //logar
  async buscarUsuario(req, resp) {
    const { email, senha } = req.body;

    //Testa o email pq não vai poder repetir
    const emailExist = await Usuario.find({ email });

    if (emailExist.length !== 0) {
      await Usuario.find(
        {
          $and: [{ email }, { senha }],
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
