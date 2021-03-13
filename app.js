require('./database/index');

const express = require('express');
const server = express();
const bodyParser = require("body-parser");

//config
server.listen(4000);
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

//routes
require('./routes/items.routes')(server);
require('./routes/clientes.routes')(server);
