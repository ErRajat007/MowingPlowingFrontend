var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 
const accessToken = require('../middleware/accessToken');
// router.use(express.json());
// require("../modul/connection");
var User = require('../modul/indexmodels');
const res = require('express/lib/response');

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
 
});

router.get('/login', function(req, res, next) {
  res.send('you in a login page');
});



router.post('/singup',async(req,res)=>{
  // const {name,email,mobile,gender,language}= req.body;
  
  try{

      var data= new User(req.body)
      // var user= await data.save();
      
      const hash = bcrypt.hashSync(data.password,10)
      
      const user = await User.create({
        name:data.name,
        email:data.email,
        mobile:data.mobile,
        gender:data.gender,
        language:data.language,
        password:hash,
        role:data.role,
        code:data.code
       
      })
      const token = jwt.sign({user_id:user.id},"aabbcc")
      
      return res.json({status:true,data:{user_id:user._id,token:token},message:"user registered successfully"})
  }catch(err){
    return res.json(err)
    console.log(err)
    }
  
})




router.post('/singin',async(req,res)=>{
  const {email,password}= req.body
  if(!email) return res.json({status:false,message:"Email is require"});
  if(!password) return res.json({status:false,message:"Password is require"});
  try{

    var user = await User.findOne({email})
    if(!user) return res.json({status:false,message:'Email is not exist'});
   
    const match = await bcrypt.compare(password,user.password)
    if(!match) return res.json({status:false,message:"password is wrong"})

    const token = jwt.sign({user_id:user._id},"aabbcc")

    return res.json({status:true,data:{
      user_id:user._id,
      name:user.name,
      email:user.email,
      role:user.role,
      token:token,
    },message:"Login Successfully"})
    
  }catch(err)
    {
      return res.json(err)
    }
})

//register by call back function 
// router.post('/register', async(req,res,next)=>{
//   const {first_name,last_name,email,mobile,password}=req.body
//   if(!first_name) return res.json({message:"First name is require"})
//   if(!last_name) return res.json({message:"Last name is require"})
//   if(!email) return res.json({message:"Email is require"})
//   if(!mobile) return res.json({message:"Mobile is require"})
//   if(!password) return res.json({message:"Password is require"})

//   var user=new User(req.body)
//   // return res.json("okkk")

//   user.save().then((result)=>{
//     // console.log(result)
//     return res.json("rajat")
//   }).catch((err)=>{ 
//     console.log(err)
//   })
//   return res.json({status:true,message:"user information added"});
    
//   });


// router.post('/register', (req, res)=>{
  
//   var user= new User(req.body)
  
//   user.save().then(()=>{
  
//     res.send(user)
//   }).catch((err)=>{
//     res.send(err);
//   })
//   // res.send('register')
    
//   });


router.post('/register',async(req,res)=>{
  const {first_name,last_name,email,mobile,password}=req.body
  if(!first_name) return res.json({message:"first_name is require"})
  if(!last_name) return res.json({message:"Last name is require"})
  if(!email) return res.json({message:"Email is require"})
  if(!mobile) return res.json({message:"Mobile is require"})
  if(!password) return res.json({message:"Password is require"})

  try{

    // var user = await User.findOne({where:{is_deleted:0}})
    var user= new User(req.body)
    var userss= await user.save()
    return res.json({data:userss,message:"data added"})
  }catch(err)
  {
    console.log(err)
    return res.json(err)
  }
})

//register data defrent type

// router.post('/register',async(req,res)=>{

// const {first_name,last_name,mobile,email,password}= req.body
//   try{
    
//     var user = await User.create( { 
//     // return res.json(user)
//     first_name,
//     last_name,
//     mobile,
//     email,
//     password
//     })
//     user.save();
//     return res.json(user)


//   }catch(err)
//   {
//     console.log(err)
//   }

// })

//find data to database
router.post('/get_user',async(req,res)=>{
  try{

    var user= await User.find();
    var data=[];
    for(var i=0;i<user.length; i++)
    {
      data.push({ 
        // name:user[i].first_name,
        _id:user[i]._id
      })
    }
    return res.json(data)

  }catch(err)
  {
    return res.json(err)
  }
})

//find data by url
router.post('/get_user/:id',async(req,res)=>{
  try{

    const _id=req.params.id;
    var user = await User.findById(_id);
    return res.json({data:user,nessage:"user details"})


  }catch(err)
  {
    return res.json({status:false,message:"something is wrong"})
    console.log(err)
  }
})
//find and deleted
router.post('/delete_id/:id',async(req,res)=>{
  try{

    const _id=req.params.id;
    
    var user= await User.findByIdAndDelete(_id);
    return res.json({data:user,message:"deleted data"})

  }catch(err)
  {
    return res.json(err)
  }
})

//update studant data 
router.post('/update_details/:id',async(req,res)=>{
  try{
    
    var _id = req.params.id
    var user = await User.findByIdAndUpdate(_id,req.body,{new:true})
    return res.json({data:user,message:"data updated"})

  }catch(err)
  {
    return res.json(err)
  }
})



// //login
// router.post('/login',async(req,res)=>{
//   const {email,password}= req.body;
//   if(email) return res.json({status:false,message:"Email is require"});
//   if(password) return res.json({status:false,message:"Password is require"});
//   try{

//     var user_data = User.findOne({email,password})
   

//   }catch(err)
//   {
//     console.log(err)
//     return res.json(err)
//   }
// })



module.exports = router;
