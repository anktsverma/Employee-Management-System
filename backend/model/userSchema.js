const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt =require('jsonwebtoken');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    profession:{
        type:String,
        required:true
    },
    tokens:[
             {
               token:{
                  type:String,
                  required:true
               }
            }
          ]
})

userSchema.methods.generateToken=async function(){
    try{
        let token=await jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens=await this.tokens.concat({token:token});
        await this.save();
        return token
    }
    catch(err){console.log(err)};
}

userSchema.pre('save',async function(req,res,next){
   if(this.isModified('password')){
       this.password=await bcrypt.hash(this.password,12);
       this.cpassword=await bcrypt.hash(this.cpassword,12);
   }
   next();
})

const User=mongoose.model('USER',userSchema);
module.exports=User;