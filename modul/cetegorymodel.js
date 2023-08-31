const res = require('express/lib/response');
const db=require('./connection');
const validator= require('validator');
var mongoose= require('mongoose');   

var categ= new mongoose.Schema({
    name:{
        type:String,
       
    },
    status:{
        type:Number,
        
    },
  
    code:{
        type:String,
        
    },
    is_deleted:{
        type:Number,
        default:0
    },
    image:{ 
        
        type: String 
     },
    date:{
        type:Date,
        default:Date.now()

    }

})

// COLLECTION CREATE (table create)with the help of model

// const Bank_detail = new mongoose.model("Bank_detail",indexmodel)
const Category = new mongoose.model("Category",categ)

module.exports= Category;


