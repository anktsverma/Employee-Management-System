const express=require('express');
const router=express.Router();
const employeeController=require('../controller/employeeController');
const verifyEmployee=require('../middleware/verifyEmployee')

router.post("/registerEmployee",employeeController.registerEmployee)
router.post("/loginEmployee",employeeController.loginEmployee)
router.route("/Employee/:id").get(verifyEmployee,employeeController.getEmployee)
router.patch("/employee/Employee/:id",verifyEmployee,employeeController.updateEmployee)
router.route("/leave/:id").get(verifyEmployee,employeeController.getLeaveData).post(verifyEmployee,employeeController.applyForLeave)


module.exports=router