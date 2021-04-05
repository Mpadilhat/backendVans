const socketio = require("socket.io");
const calculateDistance = require("./models/utils/calculateDistance");

let io;
const connections = [];

exports.setupWebsocket = (server) => {
  io = socketio(server);

  io.on("connection", (socket) => {
    const { latitude, longitude, nomeEmpresa } = socket.handshake.query;

    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
      empresa: nomeEmpresa,
    });
  });
};

exports.findConnections = (coordinates, empresa) => {
  return connections.filter((connection) => {
    return (
      calculateDistance(coordinates, connection.coordinates) < 5 &&
      connection.empresa === empresa
    );
  });
};

exports.sendMessage = (to, message, data) => {
  to.forEach((connection) => {
    io.to(connection.id).emit(message, data);
  });
};
