var express = require('express');
const Category = require('../modul/cetegorymodel');
const Subcategory = require('../modul/subcategorymodel');
const User  = require('../modul/indexmodels');
const multer = require('multer');
const path = require('path');
// router.use(express.json());
var router = express.Router();

/* admin control api */




// ADD CATEGORY

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null,'backend/public/documents/')
   cb(null, path.join(__dirname,'../public/categoryImg'))
    },
  filename: function (req, file, cb) {
    cb(null, Date.now()+'.png')
  }
})

var upload = multer({ storage: storage })


router.post('/add_category',upload.single('image'),async(req,res)=>{
  try{

  var data= new Category(req.body);
   return res.json(req.file.filename)
    const category = await Category.create({
      name:data.name,
      status:data.status,
      image:req.file.filename,
      code:req.body.code,
     
     })
     return res.json({status:true,data:{category},message:"data added"})
  }catch(err)
  {
    return res.json(err)
  }
})


//add sub category
router.post('/add-subCat',async(req,res)=>{
  try{
    var data= new Category(req.body);
    var subcategory =await Subcategory.create({
      name:data.name,
      status:data.status
     
     
     })
     return res.json(subcategory)
  }catch(err)
  {
    return res.json(err)
  }
})

//get cetegory

router.post('/get_category',async(req,res)=>{
  try{
    
    var category = await Category.find({is_deleted:0})
    return res.json({status:true,category,message:"Category data"})
  }catch(er){
    return res.json(er)
  }
})



//get user

router.post('/get_user',async(req,res)=>{
  try{

    var user = await User.find({role:"user",is_deleted:0});
    return res.json({status:true,data:{user},message:"data show"})

  }catch(err)
  {
    return res.json({status:false,message:"Somthing is wrong"})
  }
})

//UPDATE USER
router.post('/update_user/:id',async(req,res)=>{
  try{
    const _id = req.params.id;
    var user = await User.findByIdAndUpdate(_id,req.body,{new:true})
    if(!user) return res.json({status:false,message:"Id not match"})
    return res.json(user)
  }catch(err)
  {
    return res.json(err)
  }
})




//deleted user
router.post('/delet_user/:id',async(req,res)=>{
  try{
    const _id=req.params.id;
    // return res.json(__id)
      // var user = await User.findByIdAndDelete(_id);
      var user = await User.findByIdAndUpdate(_id,{is_deleted:1},{new:true})
      if(!user) return res.json({status:false,message:"Id not match"})
      return res.json({status:true,message:"deleted"})
  }catch(err)
  {
    return res.json(err)
  }
});


//cleare delete
router.post('/delet_cleare/:id',async(req,res)=>{
  try{
    const _id=req.params.id;
    
    var user = await User.findByIdAndDelete(_id);
      // var user = await User.findByIdAndUpdate(_id,{is_deleted:1},{new:true})
    if(!user) return res.json({status:false,message:"Id not match"})
    return res.json({status:true,message:"deleted"})
  }catch(err)
  {
    return res.json(err)
  }
});



module.exports = router;