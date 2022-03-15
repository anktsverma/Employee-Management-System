const express=require('express');
const router=express.Router();
const loginController=require('../controller/loginController');
const employeeController=require('../controller/employeeController')

router.post('/register',loginController.Register)
router.post('/signin',loginController.Login)

router.post('/addemployee',employeeController.addEmployee)

router.get('/getemployee',employeeController.getEmployee)
router.post('/deleteemployee',employeeController.deleteEmployee)
router.post('/editemployee',employeeController.editEmployee)

// router.get('/test',(req,res)=>{
//     res.json("hello")
    
// })

module.exports=router;