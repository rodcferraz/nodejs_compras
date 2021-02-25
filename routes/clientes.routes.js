const express = require('express');
const ClienteController = require('../controllers/clienteController');
const {check} = require('express-validator')

var router = express.Router();


router.post('/cadastrar', ClienteController.cadastrar);
router.post('/comprar', ClienteController.comprar);

module.exports = server => server.use('/cliente', router);
