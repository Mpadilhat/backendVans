const Empresa = require("../models/Empresa");

//index: mostrar todos; show: mostrar um; store: criar; update: atualiza; destroy: apagar;

module.exports = {
  async filtroNome(req, resp) {
    //Todas as empresas num raio de 5km e filtro por nome
    const { latitude, longitude, empresa } = req.query;

    const Emp = await Empresa.find({
      $and: [
        { empresa: { $eq: empresa } },
        {
          localizacao: {
            $near: {
              $geometry: {
                type: "Point",
                coordinates: [longitude, latitude],
              },
              $maxDistance: 5000,
            },
          },
        },
      ],
    });

    if (Emp.length === 0) {
      return resp.json({ message: "Empresa não encontrada" });
    } else return resp.json(Emp);
  },
};
