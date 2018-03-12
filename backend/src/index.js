const express = require('express');
const config = require('./config');

const app = express();
const server = require('http').Server(app);

require('./config/mongoose');
require('./config/express')(app);
require('./config/routes')(app);

const socketServer = require('./config/sockets');

socketServer.init(server);

server.listen(config.app.port, (err) => {
  if (err) console.error(err);
  else console.log(`Listening on port ${config.app.port}`);
});
