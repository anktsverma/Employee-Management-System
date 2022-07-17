
const Employee=require('../model/employeeSchema')
const Admin=require('../model/adminSchema')
const Leave=require('../model/leaveSchema')
const bcrypt=require('bcryptjs')
const moment = require('moment')
const jwt=require('jsonwebtoken')

exports.getAllEmployee=async(req,res)=>{
    try{
        let employee=await Employee.find({});
        res.status(200).json(employee)
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err
        })
    }
}

exports.LoginAdmin=async(req,res)=>{
    try{
        let admin=await Admin.find({email:req.body.email})
        if(admin.length==0) return res.status(400).json({
           success:false,
           message:"No Employee Found"
        })
        if(await bcrypt.compare(req.body.password,admin[0].password)){
           let token=jwt.sign({id:admin[0]._id,email:admin[0].email,admin_id:admin[0].admin_id},process.env.SECRET_KEY_A)           
           admin=await Admin.find({email:req.body.email})
           
         //   res.cookie("jwt",token,{
         //     httpOnly:false,
         //     expires:new Date(Date.now()+25892000000)
         //   })
           
           res.status(200).json({
             success:true,
             message:"Login Successful",
             admin,
             token
           })
 
        }
        else{
         return res.status(400).json({
             success:false,
             message:"Password Did Not Match"
          })
        }
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err
        })
    }
}


exports.deleteEmployee=async(req,res)=>{
    try{
       let employee= await Employee.findByIdAndDelete(req.params.id)
       
       res.status(200).json({
         success:true,
         message:"Employee Successfully Deleted"
       })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err
        })
    }
}

exports.addAdmin=async(req,res)=>{
    try{
        let admin=await Admin.find({email:req.body.email,admin_id:req.body.admin_id})
        if(admin.length>0) return res.status(400).json({
            success:false,
            message:"Admin Already Exists Admin Id and Email Must be Unique"
        })
        req.body.password=await bcrypt.hash(req.body.password,12)
        admin=new Admin(req.body)
        await admin.save();

        res.status(201).json({
        success:true,
        message:"Admin Created Successfully",
        admin
    })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err
        })
    }
}

exports.getAllAdmins=async(req,res)=>{
    try{
        const admin=await Admin.find({})
        res.status(200).json(admin)
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err
        })
    }
}

exports.deleteAdmin=async(req,res)=>{
    try{
       let admin= await Admin.findByIdAndDelete(req.params.id)
       
       res.status(200).json({
         success:true,
         message:"Admin Successfully Deleted"
       })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err
        })
    }
}

exports.updateAdmin=async(req,res)=>{
    try{
       const admin=await Admin.findByIdAndUpdate(req.params.id,req.body);
       res.status(200).json({success:true,message:'Successfully Updated'})
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err
        })
    }
}

exports.getPendingLeaveData=async(req,res)=>{
    try{
        const leave=await Leave.find({status:"pending"})
        res.status(200).json(leave)
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err
        })
    }
}


exports.updateLeaveStatus=async(req,res)=>{
    try{
        const leave=await Leave.findByIdAndUpdate(req.params.id,{status:req.body.status})
        res.status(200).json({
            success:true,
            message:"Leave Updated Successfully"
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err
        })
    }
}

exports.payAllEmployee=async(req,res)=>{
      try{
         const employees=await Employee.find({})
         let date=new Date();
         let month=moment(date).format("LL").split(" ")
         employees.forEach(async(employee,index)=>{
              await Employee.findByIdAndUpdate(employee._id,{
                $push:{
                    salary_history:{
                         amount:employee.fixed_salary,
                         date:moment(date).format("YYYY-MM-DD"),
                         month:month[0],
                         mode:req.body.mode,
                         status:"successful",
                         year:moment(date).format("YYYY")
                    }
                }
              })
         })
         res.status(200).json({
            success:true,
            message:"All Employees Paid"
         })

      }
      catch(err){
        res.status(500).json({
            success:false,
            message:err
        })
    }
}

exports.updateEmployee=async(req,res)=>{
    try{
       const employee=await Employee.findByIdAndUpdate(req.params.id,req.body);
       res.status(200).json({success:true,message:'Successfully Updated'})
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err
        })
    }
}