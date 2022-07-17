const mongoose=require('mongoose')

const leaveSchema=new mongoose.Schema({
    employee_id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    start_date:{
        type:String,
        required:true
    },
    end_date:{
        type:String,
        required:true
    },
    reason:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }

})

const Leave=mongoose.model("LEAVE",leaveSchema)
module.exports=Leave