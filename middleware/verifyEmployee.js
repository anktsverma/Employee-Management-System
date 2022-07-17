const jwt=require('jsonwebtoken')
const Employee=require('../model/employeeSchema')

const verifyEmployee=(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1]
    if(token){
        jwt.verify(token,process.env.SECRET_KEY,async(err,decoToken)=>{
            if(err) return res.json({
                success:false,
                message:"Not a Valid Token",
                redirect:"/"
            })
            else{
                 const user= await Employee.findById(decoToken.id)
                 if(user) next()
                 else return res.json({
                    success:false,
                    message:"User Does not exits",
                    redirect:"/"
                })
            }
        })
    }
    else{
        return res.json({
            success:false,
            message:"No Token Present",
            redirect:"/"
        })
    }
}

module.exports=verifyEmployee