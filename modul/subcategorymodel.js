const res = require('express/lib/response');
const db=require('./connection');
const validator= require('validator');
var mongoose= require('mongoose');   

var subcategoryiiiii= new mongoose.Schema({
    // name:{
    //     type:String,
    //     unique:[false,"This name is already exist"]
       
    // },
    name:{
        type: String,
        validate: {
          validator: async function(name) {
            const names = await this.constructor.findOne({ name });
            if(names) {
              if(this.id === names.id) {
                return true;
              }
              return false;
            }
            return true;
          },
          message: props => 'The specified name  is already in use.'
        },
        required: [true, 'Name required']
      },
    status:{
        type:Number,
        default:1,
        
    },
    category_id:{
        type:String,
        required:true,
        
    },
    image:{ 
         type: String 
    },

    price:{
        type:Number,
    },

    is_deleted:{
        type:Number,
        default:0
    },
    

},{timestamps: true})

// COLLECTION CREATE (table create)with the help of model

// const Bank_detail = new mongoose.model("Bank_detail",indexmodel)
const Subcategory = new mongoose.model("Subcategory",subcategoryiiiii)

module.exports= Subcategory;


