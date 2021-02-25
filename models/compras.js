const mongoose = require('mongoose');

const Compras = new mongoose.Schema({
    idCliente : {
        type : String,
        required: true
    },
    idProduto : {
        type : String,
        required: true
    },
    quantidade : {
        type: Number,
        required: true
    },
    preco : {
        type: Number,
        required: true
    }
});

const compra = mongoose.model('Compra', Compras);

module.exports = compra;