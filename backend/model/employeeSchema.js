const mongoose=require('mongoose');

const employeeSchema=new mongoose.Schema({
    employeeid:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    dept:{
        type:String,
        required:true
    },
    imgurl:{
        type:String,
        required:true
    },

})


const Employee=mongoose.model('EMPLOYEE',employeeSchema);
module.exports=Employee;