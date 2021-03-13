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

        await ClienteRepository.ComNome(req.body.nome, (err, cliente)=> {
                if (err) return res.send('Error' + err);    
                else if (cliente.length > 0)
                    return res.send("Cliente já existe");
        });

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

        if (!erros.isEmpty()){
            console.log(erros);
            return res.status(422).jsonp(erros.array());
        }

        const compra = new Compra({
            idCliente : req.body.idCliente,
            idItem : req.body.idItem,
            quantidade : req.body.quantidade
        });

        let clienteEncontrado, itemEncontrado;

        await ClienteRepository.ComId(compra.idCliente, (err, cliente) => {
                if (err) return res.send('Error: ' + err) ;
                else if (cliente.length == 0) 
                    return res.send('Cliente não encontrado');
                
                clienteEncontrado = cliente.find((cl) => cl._id == compra.idCliente);    
        })

        await ItemRepository.ComId(compra.idItem, (err, items) => {
            if (err) return res.send('Error: '+ err);
            else if (items.length === 0) return res.send('Item não encontrado');
            
            itemEncontrado = items.find((item) => item._id == compra.idItem);
        })

        if (itemEncontrado.quantidade < compra.quantidade){
            return res.send("Existem somente" + itemEncontrado.quantidade + "disponíveis no estoque;")
        }
        
        let precoTotalCompra = itemEncontrado.preco * compra.quantidade;

        if (clienteEncontrado.dinheiro > precoTotalCompra){
           
            AdicionarEmJson('./historico/compras.json', compra, (err, response) => {
                if (err) return res.send(err);
            });
             await ItemRepository.AtualizarItem({_id: itemEncontrado._id}, {$set: {quantidade : itemEncontrado.quantidade - compra.quantidade}}, (err, response) => {
                 if (err) return res.send(err);
             });
            await ClienteRepository.AtualizarCarteira(clienteEncontrado._id, clienteEncontrado.dinheiro - precoTotalCompra, (err, response) => {
                if (err) return res.send('Error: '+ err);
            });
            res.send("Compra efetuada")
        }     
        else{
            res.send("Dinheiro insuficiente");         
        }     
    }
    catch(err){
        res.send("Error: "+ err)
    }
}

const AdicionarEmJson = function (path, compra, callback) {
    fs.readFile(path, 'utf8', function(err, data){
        if (err) callback(err, undefined);

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
            callback(err, response);

        }); 
    });
}
