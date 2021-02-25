const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    nome:{
        type:String,
        require: true
    },
    preco:{
        type:Number,
        require:true
    },
    quantidade:{
        type:Number,
        require:true
    },
    tipo:{
        type:String,
        require:true
    },
    dataAdicao:{
        type:Date,
        default:Date.now
    },
    descricao:{
        type:String,
        require:true
    }
});

const item = mongoose.model('Item', ItemSchema);

module.exports = item;