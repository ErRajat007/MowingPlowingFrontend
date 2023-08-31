const res = require('express/lib/response');
const db=require('./connection');
const validator= require('validator');
var mongoose= require('mongoose');   

var subcategoryiiiii= new mongoose.Schema({
    name:{
        type:String,
       
    },
    status:{
        type:Number,
        
    },
  
 
    is_deleted:{
        type:Number,
        default:0
    },
  
    date:{
        type:Date,
        default:Date.now()

    }

})

// COLLECTION CREATE (table create)with the help of model

// const Bank_detail = new mongoose.model("Bank_detail",indexmodel)
const Subcategory = new mongoose.model("Subcategory",subcategoryiiiii)

module.exports= Subcategory;


