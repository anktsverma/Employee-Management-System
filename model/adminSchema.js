const mongoose=require('mongoose');


const adminSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    admin_id:{
        type:String,
        required:true
    }, 
    email:{
        type:String,
        required:true
    },
    mobile_no:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    img_url:{
        type:String,
        required:true
    },

})


const Admin=mongoose.model('ADMIN',adminSchema);
module.exports=Admin;