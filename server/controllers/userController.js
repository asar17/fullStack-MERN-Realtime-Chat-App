//import model
const User=require("../models/userModel.js")
const bcrypt=require("bcrypt")
//register code 
module.exports.register=async(req,res,next)=>{
   try{
    console.log(req.body)
    const {username,password,email}=req.body;
    const usernameCheck= await User.findOne({username})
    if(usernameCheck){
        return res.json({msg:"User Already Used",status:false})
    }
    const emailCheck=await User.findOne({email})
    if(emailCheck){
        return res.json({msg:"Email Already Used",status:false})
    }
    const hashPassword=await bcrypt.hash(password,10)
    //create new user
    const user=await User.create({
        username,
        email,
        password:hashPassword
    })
    delete user.password
    //return data for const data in axios.post
    return res.json({status:true,user})
   }
   catch(ex){
       next(ex);
   }
}


//login code controller
module.exports.login=async(req,res,next)=>{
    try{
     console.log(req.body)
     const {username,password}=req.body;
     const user= await User.findOne({username})
     if(!user){
         return res.json({msg:"Incorrect Username or Password",status:false})
     }
     const isPasswordValid=await bcrypt.compare(password,user.password)
     if(!isPasswordValid){
        return res.json({msg:"Incorrect Username or Password",status:false})
    }
    
     delete user.password
     //return data for const data in axios.post
     return res.json({status:true,user})
    }
    catch(ex){
        next(ex);
    }
 }

 //setAvatar code controller
 module.exports.setAvatar=async(req,res,next)=>{
     try{
         
       const userId=req.params.id
       const avatarImage=req.body.image
       const userData=await User.findByIdAndUpdate(userId,{
           isSetAvatarImage:true,
           avatarImage:avatarImage,
       },{new:true})
       console.log(userData?.isSetAvatarImage)

       return res.json({
           isSetAvatarImage:userData?.isSetAvatarImage,
           avatarImage:userData?.avatarImage
       });
     }
     catch(ex){
       next(ex)
     }
 }

 //get all users contacts
module.exports.getAllUsers=async(req,res,next)=>{
    try {
        const users = await User.find({ _id: { $ne: req.params.id } }).select([
          "email",
          "username",
          "avatarImage",
          "_id",
        ]);
        return res.json(users);
      } catch (ex) {
        next(ex);
      }
}



 