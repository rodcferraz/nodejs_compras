const fs = require('fs');
const ClienteRepository = require('../repository/cliente.repository');
const ItemRepository = require('../repository/item.repository');
const Cliente = require('../models/clientes');
const Item = require('../models/item');
const Compra = require('../models/compras')
const ItemController = require('../controllers/itemController')
const { validationResult} = require('express-validator')

exports.cadastrar = async function(req, res){
    try{
        const erros = validationResult(req);

        if (!erros.isEmpty())
            return res.status(422).jsonp(erros.array());

        if (await Cliente.find({nome : req.body.nome}, (err, cliente)=> {
            if (err) throw err;
            return cliente;
        }).length > 0){
            res.send("Cliente já existe")
        }

        await ClienteRepository.Cadastrar(req.body);

        res.send("Cliente criado com sucesso.");
    }
    catch(err){
        res.send("Error: "+ err);
    }
};

exports.comprar = async function(req, res){
    try{
        const erros = validationResult(req);

        if (!erros.isEmpty())
            return res.status(422).jsonp(erros.array());

        const compra = new Compra({
            idCliente : req.body.idCliente,
            idItem : req.body.idItem,
            quantidade : req.body.quantidade
        });

        let cliente = await Cliente.find({_id : compra.idCliente}, (err, cliente)=> {
            if (err) throw err;
            return cliente;
        });

        if (cliente.length == 0)
            return res.send('Cliente não encontrado');

        var item = await Item.find({_id: compra.idItem}, (err, item) => {
            if (err) throw err;
            return item;
        });
    
        if (item.length == 0)
            return res.send('Item não encontrado');

        if (item[0].quantidade < compra.quantidade){
            return res.send("Existem somente" + item[0].quantidade + "disponíveis no estoque;")
        }

        let precoTotalCompra = item[0].preco * compra.quantidade;

        if (cliente[0].dinheiro > precoTotalCompra){
            AdicionarEmJson('./historico/compras.json', compra);
            await ItemRepository.AtualizarItem({_id: item[0]._id}, {$set: {quantidade : item[0].quantidade - compra.quantidade}});
            await ClienteRepository.AtualizarCarteira(cliente[0]._id, cliente[0].dinheiro - precoTotalCompra, res);
        }     
        else{
            res.send("Dinheiro insuficiente");         
        }     
    }
    catch(err){
        res.send("Error: "+ err)
    }
}

const AdicionarEmJson = function (path, compra) {
    fs.readFile(path, 'utf8', function(err, data){
        if (err) throw err;

        let obj = [];
        let json;

        if (data){
            obj.push(JSON.parse(data));
            obj.push(compra);
            json = JSON.stringify(obj); 
        }
        else{
            json = JSON.stringify(compra);
        }
           
        fs.writeFile(path, json, 'utf8', function (err, response){
            if (err) throw err;
            res.send(response);
        }); 
    });
}
