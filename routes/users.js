var express = require('express');
const Category = require('../modul/cetegorymodel');
const User = require('../modul/indexmodels');
var router = express.Router();
const bcrypt = require("bcrypt");
const multer = require('multer');
const path = require('path');
const accessToken = require('../middleware/accessToken');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users');
});



//get category
router.post('/get-cate',accessToken,async(req,res)=>{
  try{

     var user= await User.findOne({_id:req.user.user_id,is_deleted:0})
     if(!user) return res.json({status:false,message:"User id not found"})
     

     const cate = await Category.find({is_deleted:0}).select({date:0,is_deleted:0,__v:0})
     return res.json({status:true,data:cate,message:"category data"})
    // return res.json(cate.)

  }catch(err){
    return res.json(err)
  }
})





//edit profile 
router.post('/edit-profile',accessToken,async(req,res)=>{
  try{
    var user= await User.findOne({_id:req.user.user_id,is_deleted:0})
    if(!user) return res.json({status:false,message:"User id not found"})

      // return res.json(user)
    
    return res.json({status:true,user,message:"User details"})
  }catch(err){
    console.log(err)
  }
})



//update profile

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null,'backend/public/documents/')
   cb(null, path.join(__dirname,'../public/userProfileImg'))
    },
  filename: function (req, file, cb) {
    cb(null, Date.now()+'.png')
  }
})
var upload = multer({ storage: storage })

router.post('/update-profile',accessToken,upload.single('image'),async(req,res)=>{
  const {name,email,mobile}= req.body;

  try{
    
    var user= await User.findOne({_id:req.user.user_id,is_deleted:0});
    if(!user) return res.json({status:false,message:"User not found"});

    var check_email = await User.findOne({_id:{$ne:user._id},email})
    if(check_email) return res.json({status:false,message:"Email is already exist"})

    var check_phone = await User.findOne({_id:{$ne:user._id},mobile})
    if(check_phone) return res.json({status:false,message:"Mobile number is already exist"})
    
    user.name=name,
    user.email=email,
    user.mobile=mobile,
    user.image=req.file.filename,
    user.save();
    return res.json({status:true,data:{user},message:"User details updated....!"})

  }catch(err)
  {
    return res.json(err)
  }
})

 

//change password

router.post('/change-password',accessToken,async(req,res)=>{
  const {old_password,password}= req.body;
  try{
    
    var user = await User.findOne({_id:req.user.user_id,is_deleted:0});
    if(!user) return res.json({status:false,message:"User not found"})
    // const match = await bcrypt.compare(oldpassword,user.password)

    var match = await bcrypt.compare(old_password,user.password);
    if(!match) return res.json({status:false,messsage:"Password not match"})

    const hash =  bcrypt.hashSync(password,10);
    
    user.password=hash;
    user.save();
    return res.json({status:false,message:"Password changed..! 👍"})
    

  }catch(err)
  {
    return res.json(err)
  }
})

//
router.post('/double-data',accessToken,async(req,res)=>{
  try{
    // db.users.aggregate([{$lookup:{from:"categories",localField:"code",foreignField:"code",as:"data"}}])
    // var user = await User.aggregate([  {$match:{is_deleted:0}},{$lookup:{from:"categories",localField:"code",foreignField:"code",as:"data"}}]);
 
    var user = await User.aggregate([
    {$match:{is_deleted:0}},
   
    
    
    {
      $lookup: {
      from: 'categories',
      localField: 'code',
      foreignField: 'code',
      as: 'category',
      }
     
      
   },
   {
    $lookup: {
      from: 'subcategories',
      localField: 'status',
      foreignField: 'status',
      as: 'subcategory',
      }
   },
  //  {"$unwind":"$category"} //$unwind se array hat jata h ek hi value ati h  
 
   
  ]);
 

  //return res.json(user)
      var data=[]
        for(var i=0;i<user.length;i++)
        {
          data.push({

            studentInfo :user[i].category,
            
          })

            for(var j=0;j<user[i].category.length;j++)
            {
              data.push({
                catName:user[i].category[j].name,
              })
            }

        }
      

   return res.json({status:true,data:data,message:"datas"})
  }catch(err){
  
    return res.json({status:false,message:err})
  }
})

//find data and group by
router.post('/group-by',accessToken,async(req,res)=>{
  try{
    
    var user= await User.aggregate([
      {$match:{is_deleted:0}},
      {
        // $group: { 
           
        //    _id: "$status", 
        //    countA: { $sum:1}
        // }
        $group:{"_id":"$_id","doc":{"$first":"$$ROOT"}},
     },
       
    {
      $lookup: {
      from: 'categories',
      localField: 'doc.status',
      foreignField: 'status',
      as: 'category',
      }
     
      
   }
    ])
  return res.json({user})
 
  }catch(err)
  {
    return res.json(err)
  }
})


module.exports = router;
