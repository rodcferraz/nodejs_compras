const Item = require('../models/item')

exports.ComId = async function(idProduto){
    await Item.find({_id: idProduto}, (err, item) => {
        if (err) throw err;
        return item;
    });
}

exports.ComNome = async function(nome){
    await Item.find({nome: { $regex : new RegExp(nome, "i") }}, (err,item)=>{
        if (err) throw err;
        res.send(item)
    });
}

exports.ComTipo = async function(tipo,res){
    await Item.find({tipo: { $regex : new RegExp(tipo, "i") }}, (err,item)=>{
        if (err) throw err;
        res.send(item)
    });
}

exports.Todos = async function(res){
    await Item.find({},(err, items)=>{
        if (err) throw err;
        res.send(items);
   });
}

exports.Cadastrar = async function(item, res){
    await Item.create(item);
    res.send("Item criado com sucesso")
}

exports.Atualizar = async function(buscar, atualizados, res){
    await Item.updateOne(buscar, atualizados, function(err, item) {
        if (err) throw err;
        res.send("Atualizado com sucesso");
      });
}

exports.AtualizarItem = async function(buscar, atualizados, res){
    await Item.updateOne(buscar, atualizados, function(err, item) {
        if (err) throw err;
      });
}

exports.Deletar = async function(id, res){
    await Item.deleteOne({_id : id}, function(err, obj) {
        if (err) throw err;
        res.send("Item id "+id+" deletado com sucesso");
      })
}