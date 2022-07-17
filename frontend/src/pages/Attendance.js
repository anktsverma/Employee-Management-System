import axios from 'axios';
import { useState,useEffect } from 'react';
const Attendance=({employeeData})=>{
      let total_no_of_working_days=0
      let total_no_of_days_attended=0
      let total_sick=0;
      let total_personal=0;
      let total_vacation=0;
     for(let i=0; i<employeeData.attendance.length;i++){
       total_no_of_working_days+=Number(employeeData.attendance[i].no_of_working_days)
       total_no_of_days_attended+=Number(employeeData.attendance[i].no_of_days_attended)
       total_sick+=Number(employeeData.attendance[i].sick)
       total_personal+=Number(employeeData.attendance[i].personal)
       total_vacation+=Number(employeeData.attendance[i].vacation)
      }
    return(
        <> {employeeData &&
        <div className="flex justify-center items-center p-3 overflow-y-scroll" style={{height:'80vh'}}>
        <table class="table-auto text-center border border-slate-600">
        <thead>
          <tr className="bg-slate-300">
            <th className="border border-slate-600 px-3 py-2" rowSpan={2}>Month</th>
            <th className="border border-slate-600 px-3 py-2" rowSpan={2}>No of Working Days</th>
            <th className="border border-slate-600 px-3 py-2" rowSpan={2}>No of Days Attended</th>
            <th className="border border-slate-600 px-3 py-2" colSpan={3}>Leave</th>
          </tr>
          <tr className="bg-slate-300">
              <th className="border border-slate-600 px-3 py-2">Sick</th>
              <th className="border border-slate-600 px-3 py-2">Personal</th>
              <th className="border border-slate-600 px-3 py-2">Vacation</th>
          </tr>
        </thead>
        <tbody>
          {employeeData && employeeData.attendance.map((e)=>{ return(
            <tr>
            <td className="border border-slate-600 px-3 py-2">{e.month}</td>
            <td className="border border-slate-600 px-3 py-2">{e.no_of_working_days}</td>
            <td className="border border-slate-600 px-3 py-2 text-green-600">{e.no_of_days_attended}</td>
            <td className="border border-slate-600 px-3 py-2 text-red-600">{e.sick}</td>
            <td className="border border-slate-600 px-3 py-2 text-red-600">{e.personal}</td>
            <td className="border border-slate-600 px-3 py-2 text-red-600">{e.vacation}</td>

          </tr>)
          })}
        
  
          <tr className="bg-slate-300">
          <td className="border border-slate-600 px-3 py-2 font-bold">Total</td>
          <td className="border border-slate-600 px-3 py-2 font-bold">{total_no_of_working_days}</td>
          <td className="border border-slate-600 px-3 py-2 text-green-600 font-bold">{total_no_of_days_attended}</td>
          <td className="border border-slate-600 px-3 py-2 text-red-600 font-bold">{total_sick}</td>
          <td className="border border-slate-600 px-3 py-2 text-red-600 font-bold">{total_personal}</td>
          <td className="border border-slate-600 px-3 py-2 text-red-600 font-bold">{total_vacation}</td>
          
          </tr>


        </tbody>
      </table>
        </div>}
        </>
    )
}

export default Attendance;