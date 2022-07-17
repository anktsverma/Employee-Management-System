const jwt=require('jsonwebtoken')
const Admin=require('../model/adminSchema')

const verifyAdmin=(req,res,next)=>{
    const token=req.headers.authorizationa.split(" ")[1]
    if(token){
        jwt.verify(token,process.env.SECRET_KEY_A,async(err,decoToken)=>{
            if(err) return res.json({
                success:false,
                message:"Not a Valid Token",
                redirect:"/login_admin"
            })
            else{
                 const user= await Admin.findById(decoToken.id)
                 if(user) next()
                 else return res.json({
                    success:false,
                    message:"User Does not exits",
                    redirect:"/login_admin"
                })
            }
        })
    }
    else{
        return res.json({
            success:false,
            message:"No Token Present",
            redirect:"/login_admin"
        })
    }
}

module.exports=verifyAdmin