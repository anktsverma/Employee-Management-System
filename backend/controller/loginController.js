const bcrypt =require('bcryptjs')
//requiring user Schema to read and save data from/to collection
const User=require('../model/userSchema');


exports.Login=async(req,res)=>{
   const{email,password}=req.body;
   console.log(req.body)
   if(!email || !password){
      return res.status(400).json({error:"Fill the requied fields"})
   }
   try{
      const user= await User.findOne({email:email});
      
      if(user && await bcrypt.compare(password,user.password)){
         const token=await user.generateToken();
         // console.log(token)
         res.cookie("jwtoken",token,{
            expires:new Date(Date.now()+1800000),
            httpOnly:true
         })
         res.status(200).json({messege:"Authenticated"})
      }  
      else{
         res.status(400).json({messege:"Incorrect Email or Password"})
      }
   }
   catch(err){
      console.log(err);
   }
}

exports.Register=async(req,res)=>{
    const{name,username,email,password,cpassword,mobile,profession}=req.body;
    if(!name || !email || !username || !password || !cpassword || !mobile ||!profession){
        return res.json({error:"Fill the the Required Fields"})
    }
    try{
       const userExists= await User.findOne({email:email})
       if(userExists) {
          return res.json({error:"Email Already Registered"})
       }
       else if(password!=cpassword){
          return res.json({error:"Password and Confirn Password Not Same"})
       }
       else{
         const user=new User({name,username,email,password,cpassword,mobile,profession})
         await user.save()
         res.status(201).json({"message":"User Registered Successfully"})
       }
    }
    catch(err){
       console.log(err)
    }
}