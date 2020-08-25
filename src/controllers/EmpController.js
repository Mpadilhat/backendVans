const Empresa = require("../models/Empresa");

module.exports = {
  async gravarBD(request, response) {
    const { empresa, email, endereco, latitude, longitude } = request.body;

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
        empresa,
        email,
        endereco,
        localizacao,
      });

      return response.json(emp);
    } else {
      return response.json({
        message: "Esta empresa ou e-mail já está cadastrados",
      });
    }
  },
};