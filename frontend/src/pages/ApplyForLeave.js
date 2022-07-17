import axios from 'axios';
import { useEffect,useState } from 'react';
import moment from 'moment'
import Swal from 'sweetalert2';
const ApplyForLeave=({employeeData})=>{
    const [leaveData,setLeaveData]=useState();
    const [refresh,setRefresh]=useState(false);
    const[leave,setLeave]=useState({
      reason:"0",
      start_date:"",
      end_date:"",
      message:""
    });
    const leaveInputHandler=(e)=>setLeave({...leave,[e.target.name]:e.target.value})
    const id=localStorage.getItem("id")

    const getLeaveData=async()=>{
       const leaves=await axios.get(`/leave/${employeeData.employee_id}`)
       setLeaveData(leaves.data);
    }
    
    useEffect(()=>{
      getLeaveData();
    },[refresh])

    const SubmitHandler=async(e)=>{
        e.preventDefault()
        //  console.log(leave)
        const applyforleave=await axios.post("/leave/"+id,{...leave,status:"pending",employee_id:employeeData.employee_id,name:employeeData.name})
        Swal.fire({
          icon: 'success',
          title: 'Leave Application',
          text:applyforleave.data.message,
        })
        setRefresh(!refresh)
        setLeave({
           reason:"0",
           start_date:"",
           end_date:"",
           message:""
        })
    }

    return(
        <div className='flex p-3 justify-evenly items-center overflow-y-scroll' style={{height:'80vh'}}>
            <div>
            <form className='flex flex-col'>
            <label className="my-3">Subject:</label>
              <select className='border border-slate-600 mx-2' value={leave.reason} onChange={leaveInputHandler} name="reason">
                 <option disabled selected value="0">Select Reason</option>
                 <option value="Sick">Sick</option>
                 <option value="Personal">Personal</option>
                 <option value="Vacation">Vacation</option>
              </select>
           <div className='flex items-center'>
           <label className="my-3">From: </label>
           <input className='border border-slate-600 mx-2' type="date" onChange={leaveInputHandler} value={leave.start_date} name="start_date"></input>
           <label className="my-3">To: </label>
           <input className='border border-slate-600 mx-2' type="date" onChange={leaveInputHandler} value={leave.end_date} name="end_date"></input>
           </div>

            <label className="my-3">Message</label>
            <textarea className='border border-slate-600' placeholder="Type Your Message" onChange={leaveInputHandler} value={leave.message} name="message"></textarea>
            <button className='btn btn-primary mt-5' onClick={SubmitHandler}>Apply</button>
           </form>
           </div>

            <div>
            <table class="table-auto text-center border border-slate-600">
        <thead>
          <tr className="bg-slate-300">
            <th className="border border-slate-600 px-3 py-2">From</th>
            <th className="border border-slate-600 px-3 py-2">To</th>
            <th className="border border-slate-600 px-3 py-2">Reason</th>
            <th className="border border-slate-600 px-3 py-2">No of Days</th>
            <th className="border border-slate-600 px-3 py-2">Status</th>

          </tr>
        </thead>
        {leaveData && <tbody>
          {leaveData.map((data,index)=>{
             return(
                <tr>
                  <td className="border border-slate-600 px-3 py-2">{moment(data.start_date).format("DD/MM/YYYY")}</td>
                  <td className="border border-slate-600 px-3 py-2">{moment(data.end_date).format("DD/MM/YYYY")}</td>
                  <td className="border border-slate-600 px-3 py-2 ">{data.reason}</td>
                  <td className="border border-slate-600 px-3 py-2 ">{moment(data.end_date).diff(moment(data.start_date),'days')}</td>
                  {data.status=="pending" && <td className="border border-slate-600 px-3 py-2 text-yellow-600"><i class="bi bi-arrow-clockwise"></i> {data.status}</td>}
                  {data.status=="approved" && <td className="border border-slate-600 px-3 py-2 text-green-600"><i class="bi bi-check2-circle"></i> {data.status}</td>}
                  {data.status=="declined" && <td className="border border-slate-600 px-3 py-2 text-red-600"><i class="bi bi-x-circle"></i> {data.status}</td>}

              </tr>
             )
          })}
        </tbody>}
      </table>
            </div>

        </div>
    )
}

export default ApplyForLeave;