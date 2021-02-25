const Cliente = require('../models/clientes');


exports.ComId = async function(idCliente){
    await Cliente.find({_id : idCliente}, (err, cliente)=> {
        if (err) throw err;
        return cliente;
    });
}

exports.ComNome = async function(nome){
    await Cliente.find({nome: nome}, (err, item)=>{
        if (err) throw err;
        return item;
    }); 
}

exports.Cadastrar = async function(cliente){
    await Cliente.create(cliente);
}

exports.AtualizarCarteira = async function(idCliente, dinheiro, res){
    await Cliente.updateOne({_id: idCliente}, {$set : {dinheiro : dinheiro}}, function(err, cliente){
        if (err) throw err;
        res.send("Compra efetuada");
    });
}

