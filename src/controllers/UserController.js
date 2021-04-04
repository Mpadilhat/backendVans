const Usuario = require("../models/Usuario");
const Empresa = require("../models/Empresa");

module.exports = {
  async criarUsuario(req, resp) {
    const { email, senha, foto } = req.body;

    //Verificar se já existe usuario cadastrado com aquele e-mail
    const emailExist = await Usuario.find({ email });

    if (!emailExist || emailExist.length === 0) {
      //Cadastra a usuario no Banco de Dados
      const user = await Usuario.create({
        email,
        senha,
        foto,
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
      } else {
        resp.json({
          id: result._id,
          email: result.email,
          foto: result.foto,
        });
      }
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
            else {
              return resp.json([
                {
                  id: result[0]._id,
                  email: result[0].email,
                  foto: result[0].foto,
                },
              ]);
            }
          }
        }
      );
    } else {
      return resp.json({ message: "Este usuário não existe" });
    }
  },

  //editar = 'update' nos controllers
  async editarUsuario(req, resp) {
    const { id } = req.params;
    const { email, senha } = req.body;

    await Usuario.updateOne(
      { _id: id },
      {
        $set: { email, senha },
      },
      function (err, result) {
        if (err) {
          resp.json({ message: "Erro ao atualizar usuário!" });
        } else {
          resp.json({ message: "Usuário atualizado com sucesso!" });
        }
      }
    );
  },

  //editar foto
  async editarFoto(req, resp) {
    const { id } = req.params;
    const { foto } = req.body;

    await Usuario.updateOne(
      { _id: id },
      {
        $set: { foto },
      },
      function (err, result) {
        if (err) {
          resp.json({ message: "Erro ao atualizar foto!" });
        } else {
          Empresa.updateOne(
            { _id: id },
            {
              $set: { foto },
            },
            function (err, res) {
              if (err) {
                resp.json({ message: "Erro ao atualizar foto da empresa!" });
              } else {
                resp.json(result);
              }
            }
          );
        }
      }
    );
  },

  //deletar = 'destroy' nos controllers
  async deletarUsuario(req, resp) {
    const { id } = req.params;

    await Usuario.deleteOne(
      { _id: id },

      function (err, result) {
        if (err) {
          resp.json({ message: "Erro ao deletar usuário!" });
        } else {
          resp.json({ message: "Usuário deletado com sucesso!" });
        }
      }
    );
  },

  //verifica senha para edição
  async buscarSenha(req, resp) {
    const { id, senha } = req.body;

    await Usuario.find(
      {
        $and: [{ _id: id }, { senha }],
      },
      function (err, result) {
        if (err) {
          return resp.json({ message: "Erro ao validar senha" });
        } else {
          if (result.length === 0)
            return resp.json({ message: "Senha incorreta!" });
          else {
            return resp.json({ message: "Senha validada" });
          }
        }
      }
    );
  },

  //editar senha
  async editarSenha(req, resp) {
    const { id, senha } = req.body;

    await Usuario.updateOne(
      { _id: id },
      {
        $set: { senha },
      },
      function (err, result) {
        if (err) {
          resp.json({ message: "Erro ao atualizar senha!" });
        } else {
          resp.json({ message: "Senha atualizada com sucesso!" });
        }
      }
    );
  },
};
