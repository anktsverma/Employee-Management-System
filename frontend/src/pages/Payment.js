import axios from "axios";
import { useState } from "react";
import {Modal,Button} from 'react-bootstrap'
import Swal from "sweetalert2";
const Payment=()=>{
  const [paymentData,setPaymentData]=useState();
  const paymentDataHandler=(e)=>setPaymentData({...paymentData,[e.target.name]:e.target.value});
  const payAllEmployees=async()=>{
    console.log(paymentData)
    const payallemployee=await axios.post("/payallemployee",paymentData);
    Swal.fire({
      icon: 'success',
      title: 'Payment',
      text:payallemployee.data.message,
    })
  }
    return(
        <div className="flex flex-col  justify-center items-center my-3 overflow-y-scroll" style={{height:'80vh'}}>
          <select className="border border-slate-500 my-3">
          <option disabled selected>Select the category</option>
          <option>
           Pay All Employee
          </option>
          <option disabled>
          Pay By Department
         </option>
         <option disabled>
         Pay By Employee Id
        </option>
          </select>

          <select  className="border border-slate-500 my-3" name="mode" onChange={paymentDataHandler}>
          <option disabled selected>Select Mode of Payment</option>
          <option value="NEFT">
           NEFT
          </option>
          <option value="IMPS">
          IMPS
         </option>
         <option value="UPI">
         UPI
        </option>
          </select>

          <button className="btn btn-primary" onClick={()=>{payAllEmployees()}}>Process Payment</button>
        </div>
    )
}

export default Payment;