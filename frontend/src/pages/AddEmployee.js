import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import axios from 'axios';
import {useState} from 'react';
import Swal from 'sweetalert2';

const AddEmployee = () => {
    const [employee,setEmployee]=useState();

    const employeeInputHandler=(e)=>{
        setEmployee({...employee,[e.target.name]:e.target.value})
    }

    const addEmployee=async()=>{
         const addemployee=await axios.post("/registerEmployee",employee) 
         Swal.fire({
          icon: 'success',
          title: 'Add Employee',
          text:addemployee.data.message,
      })
   }

  return (
    <>
    <div className="flex flex-col items-center overflow-y-scroll" style={{height:'80vh'}} >
     <form className='flex w-full justify-evenly'>
      <div >
      <label className='my-2 font-bold underline'>Personal Details</label>
        <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon1" className="font-bold">
            Name
          </InputGroup.Text>
          <Form.Control  name="name"  className="bg-white" onChange={employeeInputHandler} />
        </InputGroup>
        <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon1" className="font-bold">
            Employee Id
          </InputGroup.Text>
          <Form.Control  name="employee_id" className="bg-white" onChange={employeeInputHandler} />
        </InputGroup>
        <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon1" className="font-bold">
            Email
          </InputGroup.Text>
          <Form.Control
            name="email"
            className="bg-white" onChange={employeeInputHandler}
          />
        </InputGroup>
        <InputGroup className="my-3">
        <InputGroup.Text id="basic-addon1" className="font-bold">
          Password
        </InputGroup.Text>
        <Form.Control
          name="password"
          className="bg-white" onChange={employeeInputHandler}
        />
      </InputGroup>
        <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon1" className="font-bold">
            Mobile No
          </InputGroup.Text>
          <Form.Control  name="mobile_no"  className="bg-white" onChange={employeeInputHandler} />
        </InputGroup>
        <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon1" className="font-bold">
            Alternate Mobile No
          </InputGroup.Text>
          <Form.Control   name="alt_mobile_no" className="bg-white" onChange={employeeInputHandler} />
        </InputGroup>
        <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon1" className="font-bold">
            Job Location
          </InputGroup.Text>
          <Form.Control name="job_location"  className="bg-white" onChange={employeeInputHandler} />
        </InputGroup>
        <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon1" className="font-bold">
            Temporary Address
          </InputGroup.Text>
          <Form.Control
            name="temp_address"
         className="bg-white" onChange={employeeInputHandler}
          />
        </InputGroup>
        <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon1" className="font-bold">
            Permanent Address
          </InputGroup.Text>
          <Form.Control
            name="per_address"
         className="bg-white" onChange={employeeInputHandler}
          />
        </InputGroup>
        <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon1" className="font-bold">
            Department
          </InputGroup.Text>
          <Form.Control
            
            name="dept"
         className="bg-white" onChange={employeeInputHandler}
          />
        </InputGroup>
        <InputGroup className="my-3">
        <InputGroup.Text id="basic-addon1" className="font-bold">
          Image Url
        </InputGroup.Text>
        <Form.Control   name="img_url" className="bg-white" onChange={employeeInputHandler} />
      </InputGroup>
</div>
<div>
      <label className='my-2 font-bold underline'>Confidential Details</label>

        <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon1" className="font-bold">
            Pan No
          </InputGroup.Text>
          <Form.Control  name="pan_no"  className="bg-white" onChange={employeeInputHandler} />
        </InputGroup>
        <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon1" className="font-bold">
            Aadhar No
          </InputGroup.Text>
          <Form.Control  name="aadhar_no" className="bg-white" onChange={employeeInputHandler} />
        </InputGroup>
        <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon1" className="font-bold">
            Account No
          </InputGroup.Text>
          <Form.Control  name="account_no"  className="bg-white" onChange={employeeInputHandler} />
        </InputGroup>
       
        <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon1" className="font-bold">
            IFSC Code
          </InputGroup.Text>
          <Form.Control  name="ifsc_code" className="bg-white" onChange={employeeInputHandler} />
        </InputGroup>
        <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon1" className="font-bold">
            Bank Name
          </InputGroup.Text>
          <Form.Control
            
            name="bank_name"
         className="bg-white" onChange={employeeInputHandler} 
          />
        </InputGroup>
        <InputGroup className="my-1" >
            <InputGroup.Text id="basic-addon1" className="font-bold">Fixed Salary</InputGroup.Text>
            <InputGroup.Text id="basic-addon2" className="font-bold">$</InputGroup.Text>
               <Form.Control   className='' name="fixed_salary" onChange={employeeInputHandler} />
            </InputGroup>
      </div>
      </form>
    <button className='btn btn-primary w-40 my-3 ' onClick={()=>{addEmployee()}}><i class="bi bi-check-circle"></i> Add Employee</button>
    </div>
    </>
  )
  }

export default AddEmployee
