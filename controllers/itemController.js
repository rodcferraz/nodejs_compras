const config = require('../config');
const Item = require('../models/item');
const ItemRepository = require('../repository/item.repository')
const { validationResult} = require('express-validator')
const url = require('url');

exports.cadastrar = async function(req, res){
    try{
        const erros = validationResult(req);

        if (!erros.isEmpty())
            return res.status(422).jsonp(erros.array()); 

        await ItemRepository.Cadastrar(req.body, res);

    }
    catch(err){
        res.send("Error: "+ err);
    }    
};

exports.todos = async function (req, res){
    
    try{
         ItemRepository.Todos(res);
    }
    catch(err){
        res.send('Error :'+ err);
    }  
};

exports.tipo = async function(req, res) 
{
    try{
        const erros = validationResult(req.params.tipo);

        if (!erros.isEmpty())
            return res.status(422).jsonp(erros.array()); 

        let tipoValido = config.tiposArmaduras.find(tipo => {
            return req.params.tipo.toUpperCase() === tipo;
        });

        if (tipoValido){
            await ItemRepository.ComTipo(req.params.tipo, res)
        }
        else{
            res.send("Tipo não válido");
        }    
    }
    catch(err){
        res.send("Error :"+ err);
    }
};

exports.buscar = async function(req, res) 
{
    try{
        let ids = [];
        let nomes = [];

        if (req.body.id){
            ids = await Item.find({_id: req.body.id}, (err,item)=>{
                console.log(item)
                return item;
            });
        }
        if (req.body.nome){
            nomes = await Item.find({nome: { $regex : new RegExp(req.body.nome, "i") }}, (err,item)=>{
                console.log(item)
                return item;
            });
        }
        
        res.send(ids.concat(nomes));
    }
    catch(err){
        res.send('Error :'+ err);
    }
    
};

exports.atualizar = async function(req, res) {

    try{
        const erros = validationResult(req);

        if (!erros.isEmpty())
            return res.status(422).jsonp(erros.array()); 

        let buscar = {_id : req.body._id};
        
        let atualizados = {$set: {
            nome: req.body.nome, 
            preco : req.body.preco,
            quantidade : req.body.quantidade,
            tipo : req.body.tipo, 
            descricao : req.body.descricao
        } };

        await ItemRepository.Atualizar(buscar, atualizados, res)
    }
    catch(err){
        res.send("Error: "+ err);
    }
};

exports.deletar = async function(req, res){

    try{
        const erros = validationResult(req);

        if (!erros.isEmpty())
            return res.status(422).jsonp(erros.array()); 

        var item = await Item.find({_id: req.params.id}, (err, item) => {
            if (err) throw err;
            return item;
        });

        if (item.length > 0 ){
            await ItemRepository.Deletar(req.params.id, res);
        }
        else{
            res.send("Item não encontrado");
        }
    }
    catch(err){
        res.send("Error: "+ err);
    }
}
