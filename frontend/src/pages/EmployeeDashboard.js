import ApplyForLeave from "./ApplyForLeave";
import Attendance from "./Attendance";
import CheckDetails from "./CheckDetails";
import EditDetails from "./EditDetails";
import PaymentDetails from "./PaymentDetails";
import { useState ,useEffect} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
   const[menu,setMenu]=useState([1,0,0,0,0])
   const [employeeData,setEmployeeData]=useState();
   const [refresh,setRefresh]=useState(false)
   const navigate=useNavigate()

   const id=localStorage.getItem("id")

   const Employee=async()=>{
     const employee=await axios.get(`/Employee/${id}`)
     if(employee.data.success==false){
         navigate(`${employee.data.redirect}`)
     }
     console.log(employee.data)
     setEmployeeData(employee.data)
   }

   const Active=(param)=>{
       for(var i=0;i<5;i++)
       {
          document.getElementById(i).classList.replace("bg-cyan-500","bg-white")
          document.getElementById(i).classList.replace("text-white","text-cyan-500")
       }   
       document.getElementById(param).classList.replace("bg-white","bg-cyan-500")
          document.getElementById(param).classList.replace("text-cyan-500","text-white")
   }

   const Logout=()=>{
      localStorage.removeItem("id");
      localStorage.removeItem("token")
      navigate("/")
   }

   useEffect(()=>{
       Employee();
   },[refresh])

    return ( 
        <div className="flex overflow-hidden" style={{height:'100vh'}}>
             <div className="flex flex-col align-items-center w-1/6 border-r-2" >

                 <div className="flex flex-col align-items-center bg-gradient-to-r from-cyan-500 to-blue-500 w-full py-3">
                 <img className="rounded-[50%]" style={{width:'100px',height:'100px'}} src={employeeData&&employeeData.img_url}/>
                 <p className="text-white my-3">{employeeData&&employeeData.name}</p>
                 </div>

                 <div className="flex flex-col align-items-start my-2">
                    <h4 className="px-3 py-3 w-full rounded hover:transition-all hover:bg-cyan-500  hover:text-white hover:drop-shadow" role="button"><i class="bi bi-house"></i> Home</h4>
                    <h4 className="px-3 py-3 w-full rounded hover:transition-all hover:bg-cyan-500  hover:text-white  hover:drop-shadow" role="button"><i class="bi bi-file-text"></i> Company Details</h4>
                    <h4 className="px-3 py-3 w-full rounded hover:transition-all hover:bg-cyan-500  hover:text-white hover:drop-shadow" role="button"><i class="bi bi-newspaper"></i> Latest Updates</h4>
                    <h4 className="px-3 py-3 w-full rounded hover:transition-all hover:bg-cyan-500  hover:text-white hover:drop-shadow" role="button"><i class="bi bi-info-circle"></i> Help</h4>
                   
                    <h4 className="px-3 py-3 w-full rounded hover:transition-all hover:bg-cyan-500  hover:text-white hover:drop-shadow" role="button"><i class="bi bi-shield-lock"></i> Privacy Policy</h4>
                    <h4 className="px-3 py-3 w-full rounded hover:transition-all hover:bg-cyan-500  hover:text-white hover:drop-shadow" onClick={Logout} role="button"><i class="bi bi-box-arrow-in-left"></i> Logout</h4>
                
                    </div>

             </div>
                  <div className=" w-full">
                  <div className="flex p-3 justify-evenly border-2" style={{height:'20vh'}}>
                  <div id="0" onClick={()=>{setMenu([1,0,0,0,0]);Active(0)}} className="flex items-center bg-cyan-500  text-white  p-4 rounded shadow cursor-pointer border-2 border-bg-cyan-500"><i class=" bi bi-bag-plus-fill text-5xl"></i><h2 className="mx-2">Check Details</h2></div>
                  <div id="1" onClick={()=>{setMenu([0,1,0,0,0]);Active(1)}} className="flex items-center  bg-white text-cyan-500  p-4 rounded shadow cursor-pointer border-2 border-bg-cyan-500"><i class=" bi bi-pencil-square text-5xl"></i><h2 className="mx-2">Edit Details</h2></div>
                  <div id="2" onClick={()=>{setMenu([0,0,1,0,0]);Active(2)}} className="flex items-center  bg-white text-cyan-500  p-4 rounded shadow cursor-pointer border-2 border-bg-cyan-500"><i class=" bi bi-person-bounding-box text-5xl"></i><h2 className="mx-2">Attendance</h2></div>
                  <div id="3" onClick={()=>{setMenu([0,0,0,1,0]);Active(3)}} className="flex items-center bg-white  text-cyan-500  p-4 rounded shadow cursor-pointer border-2 border-bg-cyan-500"><i class=" bi bi-calendar-minus text-5xl"></i><h2 className="mx-2">Apply For Leave</h2></div>
                  <div id="4" onClick={()=>{setMenu([0,0,0,0,1]);Active(4)}} className="flex items-center bg-white  text-cyan-500  p-4 rounded shadow cursor-pointer border-2 border-bg-cyan-500"><i class=" bi bi-bank text-5xl"></i><h2 className="mx-2">Payment Details</h2></div>
      
                  </div>
                    {menu[0]==1 && <CheckDetails employeeData={employeeData}/>}
                    {menu[1]==1 && <EditDetails employeeData={employeeData} setEmployeeData={setEmployeeData}/> }
                    {menu[2]==1 && <Attendance employeeData={employeeData}/> }
                    {menu[3]==1 && <ApplyForLeave  employeeData={employeeData}  setRefresh={setRefresh}  refresh={refresh}/>}
                    {menu[4]==1 && <PaymentDetails  employeeData={employeeData}/>}
             </div>
        </div>
     );
}
 
export default EmployeeDashboard;