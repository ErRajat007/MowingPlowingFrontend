const req = require("express/lib/request");
var mongoose = require("mongoose")
var url="mongodb://localhost:27017/life_service"
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false,useCreateIndex: true})

var db= mongoose.connection
console.log("connection successfully done......!")
console.log("http://localhost:3002/users/")
module.exports=db   



// var playListSchema= new mongoose.Schema({
//     name:{
//         type:String
//         // required:true
//     },
//     email:String,
//     age:Number,
//     bank_name:String,
//     amount:Number,
//     password:Number,
//     user_id:String,
//     subject:String,
//     date:{
//         type:Date,
//         default:Date.now()

//     }
// })
//COLLECTION CREATE (table create)with the help of model

// const Bank_detail = new mongoose.model("Bank_detail",playListSchema)
// const User = new mongoose.model("User",playListSchema)

//create a document ya insert a document

// insert one document
    // var bank_data=async()=>{
    //     try{

    //        var details= await Bank_detail({
    //         bank_name:"BOA",
    //         amount:2000,
    //         password:550,
    //         user_id:"61f23780a9234a1fa18251b6"
    //     })
    //     details.save();
    //     console.log(details)
    //     }catch(err)
    //     {
    //         console.log(err)
    //     }
    // }
    // bank_data();


//insert many document

        // var user_data=async(req,res)=>{
        //     try{

        //         var user1= new Bank_detail(
        //         {
        //             bank_name:"BOR",
        //             amount:2000,
        //             password:550,
        //             user_id:"61f23780a9234a1fa18251b6"

        //         })
        //         var user2 = new Bank_detail(
        //             {
        //             bank_name:"BOR",
        //             amount:2000,
        //             password:550,
        //             user_id:"61f23780a9234a1fa18251b6"
            
        //             })
        //         var user3 = new Bank_detail(
        //         {
        //             bank_name:"BOR",
        //             amount:2000,
        //             password:550,
        //             user_id:"61f23780a9234a1fa18251b6"
        //         })
        //         var user4 = new Bank_detail(
        //             {
        //             bank_name:"BOR",
        //             amount:2000,
        //             password:550,
        //             user_id:"61f23780a9234a1fa18251b6"
        //             })
        //         var user= await Bank_detail.insertMany([user1,user2,user3,user4])
                
        //         console.log(user)

        //     }catch(err)
        //     {
        //         console.log(err)
        //     }
            
        // }
        // user_data();
        

//insert many document with comon id and add two collection data

        // var user_data= async()=>{
        //     try{
            
        //         var user1 = await User.findOne().skip(2);//skip fuunction ke andr 1 likha h to 1 chod kar 2 likha he to 2 chod kar esa
        //        // console.log(user1)
        //         var bank1 = new Bank_detail({
        //             bank_name:"BOI",
        //             amount:1000,
        //             password:1230,
        //             user_id:user1._id
                    
        //         })
                
        //     var result = await Bank_detail.insertMany([bank1]);
        //     console.log(result)  

        //     }catch(err)
        //     {
        //         console.log(err)
        //     }
        // }
        // user_data();

    

// koi collection me se document ko filter kar ke bahar niklna 

        // var user_data = async()=>{
        //     try{

        //         var us = await User.find({name:" sakshi jii"}).select({name:1})//select 1 or 0 1 mtlb wo fild show karna h 0 mtlb usko chod kar sab
        //         console.log(us)
        //     }catch(err)
        // {
        //     console.log(err)
        // }
        // }
        // user_data();


//eq to operator

        // var user = async()=>{
        //     try{
        //         var us = await User.find({age:{$eq:29}}).skip(0)//equal to operator
        //         console.log(us)
        //     }catch(err)
        //     {
        //         console.log(err)
        //     }
        // }
        // user();


//gt operator in mongodb

    // var user = async()=>{
    //     try{
    //         var us = await User.find({age:{$gt:25}}).select({name:0})//greater than  operator 
    //         console.log(us)

    //     }catch(err)
    //     {
    //         console.log(err)
    //     }
    // }
    // user();

//gte operator in mongodb
    //   var user = async()=>{
    //     try{
    //         var us = await User.find({age:{$gte:28}}).select({name:0})//greater than equal operator 
    //         console.log(us)

    //     }catch(err)
    //     {
    //         console.log(err)
    //     }
    // }
    // user();

// lt operator in mongodb 

        // var data = async()=>{
        //     try{

        //         var user= await User.find({age:{$lt:25}}).select({name:0})//less than
        //         console.log(user)

        //     }catch(err)
        //     {
        //         console.log(err)
        //     }
        // }
        // data();
// lte operator in mongodb 

        // var data = async()=>{
        //     try{

        //         var user= await User.find({age:{$lte:25}}).select({name:0})//less than equal to
        //         console.log(user)

        //     }catch(err)
        //     {
        //         console.log(err)
        //     }
        // }
        // data();
// not equal to  operator in mongodb 

        // var data = async()=>{
        //     try{

        //         var user= await User.find({age:{$ne:25}}).select({name:0})//not equal to 
        //         console.log(user)

        //     }catch(err)
        //     {
        //         console.log(err)
        //     }
        // }
        // data();

//in operator in mongodb  (Matches any of the values specified in an array.)

        //   var data = async()=>{
        //             try{

        //                 var user= await User.find({subject:{$in:["node"]}}).select({name:0})//in operator array ke anadr se vahi value ayegi jo yaha di h  
        //                 console.log(user)

        //             }catch(err)
        //             {
        //                 console.log(err)
        //             }
        //         }
        //         data();

//	$nin  operator  Matches none of the values specified in an array.

        // var data = async()=>{
        //     try{

        //         var user= await User.find({subject:{$nin:["node"]}}).select({name:0})//nin operator array ke anadr se wo value nhi ayegi jo yaha di h
        //         console.log(user)

        //     }catch(err)
        //     {
        //         console.log(err)
        //     }
        // }
        // data();

//logical or operator 

    // var data = async()=>{
    //     try{

    //         var us= await User.find({$or:[{subject:"node"},{subject:"javascript"}]}) 
    //         console.log(us)
    //     }catch(err)
    //     {
    //         console.log(err)
    //     }
    // }
    // data();

//logical and operator 
    // var data = async()=>{
    //     try{
    //         var us = await User.find({$and:[{age:{$gt:26}},{name:"saif"}]}).select({name:1}).countDocuments()
    //         //countDocuments count krne ke liye select  ke andr name =1 he mtlb name hi dega
                
    //         console.log(us)
    //     }catch(err)
    //     {
    //         console.log(err)
    //     }
    // }
    // data();

// Sorting in MongoDB is done like so where 1 is ascending and -1 is descending

    // var data = async()=>{
    //     try{
    //         var us = await User.find().sort({ age: 1 })
                
    //         console.log(us)
    //     }catch(err)
    //     {
    //         console.log(err)
    //     }
    // }
    // data();

//update document 

    // var userss= async(_id)=>{
    //     try{

    //         var us = await User.updateOne({_id},{
    //                 $set:{
    //                     name:"sakshi"
    //                 }
    //             } );
    //         console.log(us);
         
    //     }catch(err){
    //         console.log(err)
    //     }
    // }
    // userss("61f25c280bec47cd6c0cf5ce");

//update document by findByIdAndUpdate()

    // var user = async(_id)=>{
    //     try{

    //         var us = await User.findByIdAndUpdate({_id},
    //             {
    //                 $set:{
    //                     name:"sakshi"
    //                 }
                    
    //             },
    //             {   
    //                 new :true,//current change data de paye 
    //                 useFindAndModify:false//warning na de paye es liye es fun. ka use kiya h
    //             })
    //             console.log(us);

    //     }catch(err)
    //     {
    //         console.log(err)
    //     }
    // }
    // user("61f25c280bec47cd6c0cf5ce");


//delete documents 

        // //  insert one document
        //     var user=async()=>{
        //         try{

        //            var details= await User({
        //             name:"abcd",
        //             age:20,
        //             email:"asdb@123gmail.com",
        //             subject:"ssshkh"
        //         })
        //         details.save();
        //         console.log(details)
        //         }catch(err)
        //         {
        //             console.log(err)
        //         }
        //     }
        //     user();



// var user = async(_id)=>{
//     try{

//         var us = await User.deleteOne({_id})
//         console.log(us);

//     }catch(err)
//     {
//         console.log(err)
//     }
// }
// user("61f3e77a02371378b64d10c9");


// var user = async(_id)=>{
//     try{

//         var us = await User.findByIdAndDelete({_id})
//         console.log(us);

//     }catch(err)
//     {
//         console.log(err)
//     }
// }
// user("61f3e8710566ef7990018abe");



//validation in quiry
        // db.createCollection("students", {
        //     validator: {
        //     $jsonSchema: {
        //         bsonType: "object",
        //         required: [ "name", "year", "major", "address" ],
        //         properties: {
        //             name: {
        //                 bsonType: "string",
        //                 description: "must be a string and is required"
        //             },
        //             year: {
        //                 bsonType: "int",
        //                 minimum: 2017,
        //                 maximum: 3017,
        //                 description: "must be an integer in [ 2017, 3017 ] and is required"
        //             },
        //             major: {
        //                 enum: [ "Math", "English", "Computer Science", "History", null ],
        //                 description: "can only be one of the enum values and is required"
        //             },
        //             gpa: {
        //                 bsonType: [ "double" ],
        //                 description: "must be a double if the field exists"
        //             },
        //             address: {
        //                 bsonType: "object",
        //                 required: [ "city" ],
        //                 properties: {
        //                 street: {
        //                     bsonType: "string",
        //                     description: "must be a string if the field exists"
        //                 },
        //                 city: {
        //                     bsonType: "string",
        //                     description: "must be a string and is required"
        //                 }
        //                 }
        //             }
        //         }
        //     }
        //     }
        // })


