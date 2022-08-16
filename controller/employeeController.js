const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const Employee=require('../model/employeeSchema')
const Leave =require('../model/leaveSchema')

exports.registerEmployee=async(req,res)=>{ 
    try{
        let employee=await Employee.find({email:req.body.email,employee_id:req.body.employee_id})
        if(employee.length>0) return res.status(400).json({
            success:false,
            message:"Employee Already Exists Employee Id and Email Must be Unique"
        })
        req.body.password=await bcrypt.hash(req.body.password,12)
        employee=new Employee(req.body)
        await employee.save();

        res.status(201).json({
        success:true,
        message:"Employee Created Successfully",
        employee
    })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err
        })
    }

}

exports.loginEmployee=async(req,res)=>{

    try{
       let employee=await Employee.find({email:req.body.email})
       if(employee.length==0) return res.status(400).json({
          success:false,
          message:"No Employee Found"
       })
       if(await bcrypt.compare(req.body.password,employee[0].password)){
          let token=jwt.sign({id:employee[0]._id,email:employee[0].email,employee_id:employee[0].employee_id},process.env.SECRET_KEY)

        //   employee=await Employee.find({email:req.body.email})
          
        //   res.cookie("jwt",token,{
        //     httpOnly:false,
        //     expires:new Date(Date.now()+25892000000)
        //   })
          
          res.status(200).json({
            success:true,
            message:"Login Successful",
            employee,
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

exports.getEmployee=async(req,res)=>{
    try{
        const employee=await Employee.findOne({_id:req.params.id});
        res.status(200).json(employee);
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err
        })
    }
}



exports.applyForLeave=async(req,res)=>{
    try{
       const {employee_id,name,start_date,end_date,reason,status,message}=req.body
       const leave=new Leave({employee_id,name,start_date,end_date,status,reason,message})
       await leave.save()
       res.status(200).json({success:true,message:'Applied For Leave'})
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err
        })
    }
}

exports.getLeaveData=async(req,res)=>{
    try{
        const leave=await Leave.find({employee_id:req.params.id})
        res.status(200).json(leave)
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

