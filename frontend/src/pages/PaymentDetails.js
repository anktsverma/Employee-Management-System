
const PaymentDetails=({employeeData})=>{
   
    return(
        <div className="flex flex-col  justify-center items-center p-3 overflow-y-scroll" style={{height:'80vh'}}>
        <select className="my-4 px-3 py-2 border border-slate-600">
        <option disabled>Select Year</option>
        </select>
        <table class="table-auto text-center border border-slate-600">
        <thead>
          <tr className="bg-slate-300">
            <th className="border border-slate-600 px-3 py-2" >Month</th>
            <th className="border border-slate-600 px-3 py-2" >Date of Payment</th>
            <th className="border border-slate-600 px-3 py-2" >Account Details</th>
            <th className="border border-slate-600 px-3 py-2" >Payment Mode</th>
            <th className="border border-slate-600 px-3 py-2" >Amount</th>
            <th className="border border-slate-600 px-3 py-2" >Status</th>
          </tr>
          
        </thead>
        { employeeData && <tbody>
            {
                employeeData.salary_history.map((data,index)=>{return(
                    <tr>
                    <td className="border border-slate-600 px-3 py-2">{data.month}</td>
                    <td className="border border-slate-600 px-3 py-2">{data.date}</td>
                    <td className="border border-slate-600 px-3 py-2">Account No-{employeeData.account_no}<br/>IFSC-{employeeData.ifsc_code}</td>
                    <td className="border border-slate-600 px-3 py-2">{data.mode}</td>
                    <td className="border border-slate-600 px-3 py-2"><i class="bi bi-currency-dollar"></i>{data.amount}</td>
                    {data.status=="successful" && <td className="border border-slate-600 px-3 py-2 text-green-600"><i class="bi bi-check2-circle"></i> {data.status}</td>}
                    {data.status=="pending" &&  <td className="border border-slate-600 px-3 py-2 text-yellow-600"><i class="bi bi-arrow-clockwise"></i> Pending</td>}
                    {data.status=="failed" && <td className="border border-slate-600 px-3 py-2 text-red-600"><i class="bi bi-x-circle"></i> Failed</td>}

                  </tr>
                )})
            }

        </tbody>}
      </table>
        </div>
    )
}

export default PaymentDetails;