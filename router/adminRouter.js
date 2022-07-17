const express=require('express');
const router=express.Router();
const adminController=require('../controller/adminController');
const verifyAdmin = require('../middleware/verifyAdmin');


router.post("/admin/login",adminController.LoginAdmin)
router.get("/Employees",verifyAdmin,adminController.getAllEmployee)
router.delete("/Employee/:id",verifyAdmin,adminController.deleteEmployee)
router.patch("/Employee/:id",verifyAdmin,adminController.updateEmployee)
router.post("/addAdmin",verifyAdmin,adminController.addAdmin)
router.get('/admins',verifyAdmin,adminController.getAllAdmins)
router.delete('/admin/:id',verifyAdmin,adminController.deleteAdmin).patch('/admin/:id',verifyAdmin,adminController.updateAdmin)
router.route("/pendingleave").get(verifyAdmin,adminController.getPendingLeaveData)
router.route("/updateleavestatus/:id").post(verifyAdmin,adminController.updateLeaveStatus)
router.route("/payallemployee").post(verifyAdmin,adminController.payAllEmployee)

module.exports=router;