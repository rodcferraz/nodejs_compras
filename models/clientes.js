const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({

    nome:{type:String, required:true},
    dinheiro:{type:Number, required:true},
});

const cliente = mongoose.model('Cliente', ClienteSchema);

module.exports = cliente;