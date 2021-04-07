const Empresa = require("../models/Empresa");

//index: mostrar todos; show: mostrar um; store: criar; update: atualiza; destroy: apagar;

module.exports = {
  async filtroProximo(req, resp) {
    //Todas as empresas num raio de 5km
    const { latitude, longitude } = req.query;

    const Emps = await Empresa.find({
      localizacao: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: 5000,
        },
      },
    });

    return resp.json({ Emps });
  },
};
