
const express = require('express');
const ItemController = require('../controllers/itemController')

var router = express.Router();

router.get('/todos', ItemController.todos);
router.post('/cadastrar', ItemController.cadastrar);
router.get('/tipo/:tipo', ItemController.tipo);
router.post('/buscar', ItemController.buscar);
router.put('/atualizar', ItemController.atualizar);
router.delete('/deletar/:id', ItemController.deletar);

module.exports = server => {
    server.use('/item', router);
}