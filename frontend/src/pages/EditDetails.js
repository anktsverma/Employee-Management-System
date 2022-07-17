import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import axios from 'axios';
import Swal from 'sweetalert2';

const EditDetails = ({employeeData,setEmployeeData}) => {
   const id=localStorage.getItem("id")
    const employeeInputHandler=(e)=>setEmployeeData({...employeeData,[e.target.name]:e.target.value})
    const updateEmployee=async()=>{
      const employee=await axios.patch(`/employee/Employee/${id}`,employeeData)
      Swal.fire({
        icon: 'success',
        title: 'Employee Details',
        text:employee.data.message,
      })
    }
  return (
    <> {employeeData&&
    <div className="flex flex-col items-center justify-center p-2 overflow-y-scroll" style={{height:'80vh'}} >
     <form className='flex w-full justify-evenly'>
      <div>
      <label className='my-2 font-bold underline'>Personal Details</label>
        <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon1" className="font-bold">
            Name
          </InputGroup.Text>
          <Form.Control value={employeeData.name} name="name"  className="bg-white" onChange={employeeInputHandler} />
        </InputGroup>
        <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon1" className="font-bold">
            Employee Id
          </InputGroup.Text>
          <Form.Control value={employeeData.employee_id} name="employee_id" className="bg-white" onChange={employeeInputHandler} />
        </InputGroup>
        <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon1" className="font-bold">
            Email
          </InputGroup.Text>
          <Form.Control
            value={employeeData.email}
            name="email"
         className="bg-white" onChange={employeeInputHandler}
          />
        </InputGroup>
        <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon1" className="font-bold">
            Mobile No
          </InputGroup.Text>
          <Form.Control value={employeeData.mobile_no} name="mobile_no"  className="bg-white" onChange={employeeInputHandler} />
        </InputGroup>
        <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon1" className="font-bold">
            Alternate Mobile No
          </InputGroup.Text>
          <Form.Control value={employeeData.alt_mobile_no}  name="alt_mobile_no" className="bg-white" onChange={employeeInputHandler} />
        </InputGroup>
        <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon1" className="font-bold">
            Job Location
          </InputGroup.Text>
          <Form.Control value={employeeData.job_location}  disabled  />
        </InputGroup>
        <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon1" className="font-bold">
            Temporary Address
          </InputGroup.Text>
          <Form.Control
            value={employeeData.temp_address}
            name="temp_address"
         className="bg-white" onChange={employeeInputHandler}
          />
        </InputGroup>
</div>
<div>
      <label className='my-2 font-bold underline'>Confidential Details</label>

        <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon1" className="font-bold">
            Pan No
          </InputGroup.Text>
          <Form.Control value={employeeData.pan_no} name="pan_no"  className="bg-white" onChange={employeeInputHandler} />
        </InputGroup>
        <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon1" className="font-bold">
            Aadhar No
          </InputGroup.Text>
          <Form.Control value={employeeData.aadhar_no} name="aadhar_no" className="bg-white" onChange={employeeInputHandler} />
        </InputGroup>
        <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon1" className="font-bold">
            Account No
          </InputGroup.Text>
          <Form.Control value={employeeData.account_no} name="account_no"  className="bg-white" onChange={employeeInputHandler} />
        </InputGroup>
        <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon1" className="font-bold">
            Account Holder's Name
          </InputGroup.Text>
          <Form.Control value={employeeData.name}  name="name" className="bg-white" onChange={employeeInputHandler} />
        </InputGroup>
        <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon1" className="font-bold">
            IFSC Code
          </InputGroup.Text>
          <Form.Control value={employeeData.ifsc_code} name="ifsc_code" className="bg-white" onChange={employeeInputHandler} />
        </InputGroup>
        <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon1" className="font-bold">
            Bank Name
          </InputGroup.Text>
          <Form.Control
            value={employeeData.bank_name}
            name="bank_name"
         className="bg-white" onChange={employeeInputHandler} 
          />
        </InputGroup>
        <InputGroup className="my-1" >
            <InputGroup.Text id="basic-addon1" className="font-bold">Payment Amount</InputGroup.Text>
            <InputGroup.Text id="basic-addon2" className="font-bold">$</InputGroup.Text>
               <Form.Control value={employeeData.salary_history[employeeData.salary_history.length-1].amount} disabled  className='' />
            </InputGroup>
      </div>
      </form>
    <button className='btn btn-primary w-40 my-3 ' onClick={()=>{updateEmployee()}}><i class="bi bi-check-circle"></i> Update Details</button>
    </div>}
    </>
  )
}

export default EditDetails
