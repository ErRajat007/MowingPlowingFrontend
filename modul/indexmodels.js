const res = require('express/lib/response');
var mongoose= require('mongoose');
const db=require('./connection');
const validator= require('validator');

                              // function indexmodel()
                              // {
                              //   this.registerUser=(userDetails)=>{
                              //   //  console.log(userDetails)
                              //   /* db.collection("registerdata").insertOne(userDetails,(err,result)=>{
                              //     err ? console.log(err) :console.log("record inserted");
                              //   })*/
                                
                              //   return new Promise((resolve,reject)=>{ 
                              //       db.collection('users').find().toArray((err,result)=>{
                              //       if(err)
                              //         reject(err)
                              //       else
                              //       //console.log(result)
                              //       { 
                              //         //  var _id
                              //         //    if(result.length==0)
                              //         //      _id=0
                              //         //     else 
                              //         //     {
                              //         //        _id=result[0]._id 
                              //         //         for(let row of result)
                              //         //           {
                              //         //           if(_id<row._id)
                              //         //           _id=row._id
                              //         //           }
                              //         //     }
                              //         //     userDetails._id=_id+1
                              //             userDetails.status=0
                              //             userDetails.role="user"
                              //             userDetails.info=Date()
                              //             db.collection("data").insertOne(userDetails,(err,result)=>{
                              //             err ? reject(err) : resolve(result);
                              //             })
                              //         }
                              //     })
                              //   })

                              //   }
                              // }



var indexmodel= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true 
    },
   
    // email:{
    //     unique:true,
    //     type:String,
    //     required:true,
    //     match: /.+\@.+\..+/,
       
    // },
    email: {
        type: String,
        validate: {
          validator: async function(email) {
            const user = await this.constructor.findOne({ email });
            if(user) {
              if(this.id === user.id) {
                return true;
              }
              return false;
            }
            return true;
          },
          message: props => 'The specified email address is already in use.'
        },
        required: [true, 'User email required']
      },
    password:{
        type:String,
       },
    titel:{
        type:String,
        required:true,
       
    },
    mobile:{
       type:String,
       required:true,
       unique:true
        
    },
    gender:{
        type:String,
        lowercase:true,
        required:true,
        enum:["male","female","other"]
    },
    // cat_id:{
    //     type:String
       
    // },
   
    // language:{
    //     type:String,
    //     required:true,
    //     enum:["english","arabic","kurdish sarani"]
    // },
    // image:{
    //     type:String
    // },
    role:{
        type:String,
        required:true,
        enum:["user","provider"]

    },
    // is_deleted:{
    //     type:Number,
    //     default:0
    // },
    // status:{
    //     type:Number,
        
    // },
  
    // code:{
    //     type:String
        
    // },
    // date:{
    //     type:Date,
    //     default:Date.now()

    // }
},{timestamps: true})

// COLLECTION CREATE (table create)with the help of model

// const Bank_detail = new mongoose.model("Bank_detail",indexmodel)
const User = new mongoose.model("User",indexmodel)

module.exports= User;