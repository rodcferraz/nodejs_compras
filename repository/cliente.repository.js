const Cliente = require('../models/clientes');


exports.ComId = async function(idCliente, callback){
    await Cliente.find({_id : idCliente}, (err, cliente)=> {
        callback(err, cliente);
    });
}

exports.ComNome = async function(nome, callback){
    await Cliente.find({nome: nome}, (err, cliente)=>{
        callback(err, cliente);
    }); 
}

exports.Cadastrar = async function(cliente){
    await Cliente.create(cliente);
}

exports.AtualizarCarteira = async function(idCliente, dinheiro, callback){
    await Cliente.updateOne({_id: idCliente}, {$set : {dinheiro : dinheiro}}, function(err){
        if (err) callback(err);
    });
}

