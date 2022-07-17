import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AddEmployee from "./AddEmployee"
import CreateAdmin from "./CreateAdmin"
import LeaveApplication from "./LeaveApplication"
import Payment from "./Payment"
import ViewAllAdmin from "./ViewAllAdmin"
import ViewAllEmployees from "./ViewAllEmployees"

const AdminDashboard=()=>{
   const[menu,setMenu]=useState([1,0,0,0,0,0])
   const name_a=localStorage.getItem("name_a");
   const img_url_a=localStorage.getItem("img_url_a")
   let navigate=useNavigate()

   const Active=(param)=>{
    for(var i=0;i<6;i++)
    {
       document.getElementById(i).classList.replace("bg-cyan-500","bg-white")
       document.getElementById(i).classList.replace("text-white","text-cyan-500")
    }   
    document.getElementById(param).classList.replace("bg-white","bg-cyan-500")
       document.getElementById(param).classList.replace("text-cyan-500","text-white")
   }
     

  const Logout=()=>{
      localStorage.removeItem("id_a");
      localStorage.removeItem("token_a")
      localStorage.removeItem("img_url_a")
      localStorage.removeItem("name_a")
      navigate("/")
   }

    return(
        <div className="flex overflow-hidden" style={{height:'100vh'}}>
        <div className="flex flex-col align-items-center w-1/6 border-r-2" >

            <div className="flex flex-col align-items-center bg-gradient-to-r from-cyan-500 to-blue-500 w-full py-3">
            <img style={{width:'100px',height:'100px',borderRadius:'50%'}} src={img_url_a?img_url_a:"/user.png"}/>
            <p className="text-white my-3">{name_a}</p>
            </div>

            <div className="flex flex-col align-items-start my-2">
               <h4 className="px-3 py-3 w-full rounded hover:transition-all hover:bg-cyan-500  hover:text-white hover:drop-shadow" role="button"><i class="bi bi-house"></i> Home</h4>
               <h4 className="px-3 py-3 w-full rounded hover:transition-all hover:bg-cyan-500  hover:text-white hover:drop-shadow" role="button"><i class="bi bi-bag-plus"></i> Create Admin</h4>
               <h4 className="px-3 py-3 w-full rounded hover:transition-all hover:bg-cyan-500  hover:text-white hover:drop-shadow" role="button"><i class="bi bi-pencil-square"></i> Edit Admin Details</h4>
               <h4 className="px-3 py-3 w-full rounded hover:transition-all hover:bg-cyan-500  hover:text-white hover:drop-shadow" role="button"><i class="bi bi-archive"></i> Delete Admin</h4>
               <h4 className="px-3 py-3 w-full rounded hover:transition-all hover:bg-cyan-500  hover:text-white hover:drop-shadow" role="button"><i class="bi bi-info-circle"></i> Help</h4>
               <h4 className="px-3 py-3 w-full rounded hover:transition-all hover:bg-cyan-500  hover:text-white hover:drop-shadow" role="button"><i class="bi bi-shield-lock"></i> Privacy Policy</h4>
               <h4 className="px-3 py-3 w-full rounded hover:transition-all hover:bg-cyan-500  hover:text-white hover:drop-shadow" role="button" onClick={()=>{Logout()}}><i class="bi bi-box-arrow-in-left"></i> Log Out</h4>
            </div>

        </div>
             <div className="w-full">
             <div className="flex p-3 justify-evenly border-2 " style={{height:'20vh'}}>
             <div id="0" onClick={()=>{setMenu([1,0,0,0,0,0]);Active(0)}} className="flex items-center bg-cyan-500  text-white  p-4 rounded shadow cursor-pointer border-2 border-bg-cyan-500"><i class="bi bi-card-list text-5xl"></i><h2 className="mx-2">View All Employees</h2></div>
             <div id="1" onClick={()=>{setMenu([0,1,0,0,0,0]);Active(1)}} className="flex items-center  bg-white text-cyan-500  p-4 rounded shadow cursor-pointer border-2 border-bg-cyan-500"><i class="bi bi-bag-plus text-5xl"></i><h2 className="mx-2">Add Employee</h2></div>
             <div id="2" onClick={()=>{setMenu([0,0,1,0,0,0]);Active(2)}} className="flex items-center  bg-white text-cyan-500  p-4 rounded shadow cursor-pointer border-2 border-bg-cyan-500"><i class=" bi bi-pencil-square text-5xl"></i><h2 className="mx-2">Create Admin</h2></div>
             <div id="3" onClick={()=>{setMenu([0,0,0,1,0,0]);Active(3)}} className="flex items-center bg-white  text-cyan-500  p-4 rounded shadow cursor-pointer border-2 border-bg-cyan-500"><i class="bi bi-archive text-5xl"></i><h2 className="mx-2">View Admins</h2></div>
             <div id="4" onClick={()=>{setMenu([0,0,0,0,1,0]);Active(4)}} className="flex items-center bg-white  text-cyan-500  p-4 rounded shadow cursor-pointer border-2 border-bg-cyan-500"><i class="bi bi-box-arrow-left-5xl"></i><h2 className="mx-2">Leave Applications</h2></div>
             <div id="5" onClick={()=>{setMenu([0,0,0,0,0,1]);Active(5)}} className="flex items-center bg-white  text-cyan-500  p-4 rounded shadow cursor-pointer border-2 border-bg-cyan-500"><i class=" bi bi-bank text-5xl"></i><h2 className="mx-2">Payments</h2></div>
             </div>

           
            {menu[0]==1 && <ViewAllEmployees/> }
            {menu[1]==1 && <AddEmployee /> }
            {menu[2]==1 && <CreateAdmin /> }
            {menu[3]==1 && <ViewAllAdmin    />}
            {menu[4]==1 && <LeaveApplication  />}
            {menu[5]==1 && <Payment  />}
           
          
        </div>
   </div>
    )
}

export default AdminDashboard;