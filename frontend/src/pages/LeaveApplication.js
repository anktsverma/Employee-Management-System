import { useEffect, useState } from "react";
import axios from 'axios';
import Loader from "./Loader";
import Swal from "sweetalert2";

const LeaveApplication=()=>{
    const [loader,setLoader]=useState(true);
    const [pendingLeave,setPendingLeave]=useState();
    const [refresh,setRefresh]=useState(false)
    const token_a=localStorage.getItem("token_a")

    const getPendingLeaveData=async()=>{
       const penleave= await axios.get("/pendingleave")
       setPendingLeave(penleave.data)
       setLoader(false)
    }

    useEffect(()=>{
        getPendingLeaveData()
    },[refresh])

    const updateLeaveStatus=async(status,id)=>{
        const res=await axios.post(`/updateleavestatus/${id}`,{status:status})
        Swal.fire({
            icon: status=='approved'?'success':'error',
            title: 'Update Leave Status',
            text:res.data.message+" "+"Status:"+status,
          })
        setRefresh(!refresh)
        
    }

    return(
        <>
        {loader && <Loader/>}
        {pendingLeave&&
        <div className="flex flex-col  justify-center items-center my-3 overflow-y-scroll" style={{height:'80vh'}}>
       
        <table class="table-auto text-center border border-slate-600">
        <thead>
          <tr className="bg-slate-300">
            <th className="border border-slate-600 px-3 py-2" >S.No</th>
            <th className="border border-slate-600 px-3 py-2" >Employee Id</th>
            <th className="border border-slate-600 px-3 py-2" >Employee Name</th>
            <th className="border border-slate-600 px-3 py-2" >From</th>
            <th className="border border-slate-600 px-3 py-2" >To</th>
            <th className="border border-slate-600 px-3 py-2" >No of Days</th>
            <th className="border border-slate-600 px-3 py-2" >Reason</th>
            <th className="border border-slate-600 px-3 py-2" >Message</th>
            <th className="border border-slate-600 px-3 py-2" >Status</th>
            <th className="border border-slate-600 px-3 py-2" colSpan={2} >Action</th>          
            </tr>
          
        </thead>
        <tbody>
        {pendingLeave&& pendingLeave.map((pendingleave,index)=>{return(
            <tr>
                    <td className="border border-slate-600 px-3 py-2">{index+1}</td>
                    <td className="border border-slate-600 px-3 py-2">{pendingleave.employee_id}</td>
                    <td className="border border-slate-600 px-3 py-2">{pendingleave.name}</td>
                    <td className="border border-slate-600 px-3 py-2">{pendingleave.start_date}</td>
                    <td className="border border-slate-600 px-3 py-2">{pendingleave.end_date}</td>
                    <td className="border border-slate-600 px-3 py-2">12/12/2002</td>
                    <td className="border border-slate-600 px-3 py-2">{pendingleave.reason}</td>
                    <td className="border border-slate-600 px-3 py-2">{pendingleave.message}</td>
                    <td className="border border-slate-600 px-3 py-2">{pendingleave.status}</td>
                    <td className="border border-slate-600 px-3 py-2 cursor-pointer text-yellow-600"><i class="bi bi-check-lg" onClick={()=>updateLeaveStatus("approved",pendingleave._id)}></i></td>
                    <td className="border border-slate-600 px-3 py-2 cursor-pointer text-red-600"><i class="bi bi-x-circle" onClick={()=>updateLeaveStatus("declined",pendingleave._id)}></i></td>
                    </tr>
        )})          
        }      
        </tbody>
      </table>
        </div>}
        </>
    )
}

export default LeaveApplication;