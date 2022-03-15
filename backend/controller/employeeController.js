const Employee=require('../model/employeeSchema')

exports.addEmployee=async(req,res)=>{
    const{name,email,username,phone,dept,imgurl}=req.body;
    // console.log(req.body)
    if(!name || !email || !username || !phone || !dept || !imgurl)  {
        res.json({error:"Fill the required Fields to Add Employee"})
    }
    
    const count=await Employee.countDocuments();
    let autoid="19UEI"+(count+1);
    try{
       const employee=new Employee({employeeid:autoid,name,email,username,phone,dept,imgurl})
       await employee.save();
       res.status(201).json({messege:"Employee Added Successfully"})
    }
    catch(err){
       console.log(err);
    }
}

exports.getEmployee=async(req,res)=>{
    try{
        const employee=await Employee.find({});
        // console.log(employee)
        res.status(200).json(employee)
    }
    catch(err){
        console.log(err);
    }
    
}

exports.deleteEmployee=async(req,res)=>{
    const {employeeid}=req.body;
    // console.log(employeeid)
    try{
      const deleteemployee=await Employee.deleteOne({employeeid:employeeid});
    //   console.log(deleteemployee);
      res.status(200).json(deleteemployee)
    }
    catch(err){
        console.log(err);
    }
}

exports.editEmployee=async(req,res)=>{
    const{name,email,username,phone,dept,employeeid,imgurl}=req.body;
    if(!name || !email || !username || !phone || !dept || !employeeid || !imgurl) {
        res.json({error:"Fill the required Fields to Update Employee"})
    }
    try{
       const editemployee=await Employee.findOneAndUpdate({employeeid},{employeeid,name,email,username,phone,dept,imgurl})
       res.status(200).json(editemployee)
    }
    catch(err){
        console.log(err)
    }
}