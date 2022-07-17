import { useEffect, useState } from "react";
import {Modal,Button} from 'react-bootstrap'
import axios from 'axios';
import { InputGroup,Form } from "react-bootstrap";
import Loader from "./Loader";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ViewAllEmployees=()=>{
  const [loader,setLoader]=useState(true);
  const [employees,setEmployees]=useState();
  const [employee,setEmployee]=useState();
  const [refresh,setRefresh]=useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate=useNavigate()

  const getAllEmployees=async()=>{
    const res=await axios.get("/Employees")
    

    if(res.data.success==false){
       navigate(`${res.data.redirect}`)
    }

    setEmployees(res.data);
    setLoader(false);
  }

  useEffect(()=>{
      getAllEmployees();
  },[refresh])
  
  const employeeChangeHandler=(e)=>setEmployee({...employee,[e.target.name]:e.target.value})

  const updateEmployee=async()=>{
    const id=employee._id;
    const tempemployee=await axios.patch(`/Employee/${id}`,employee)
    setRefresh(!refresh)
    Swal.fire({
      icon: 'success',
      title: 'Update Employee Details',
      text:tempemployee.data.message,
    })

  }
  const deleteEmployee=async(id)=>{
    const delemployee=await axios.delete(`/Employee/${id}`)
    setRefresh(!refresh) 
    Swal.fire({
      icon: 'success',
      title: 'Delete Employee',
      text:delemployee.data.message,
    })
  }

    return(
      <>
       {loader && <Loader/>}
      {employees && 
        <div className="flex flex-col  justify-center items-center my-3 overflow-y-scroll" style={{height:'80vh'}}>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         { employee &&
          <form className='flex flex-col w-full justify-evenly'>
          <div>
          <label className='my-2 font-bold underline'>Personal Details</label>
            <InputGroup className="my-3">
              <InputGroup.Text id="basic-addon1" className="font-bold">
                Name
              </InputGroup.Text>
              <Form.Control value={employee.name} name="name" onChange={employeeChangeHandler}    className="bg-white" />
            </InputGroup>
            <InputGroup className="my-3">
              <InputGroup.Text id="basic-addon1" className="font-bold">
                Employee Id
              </InputGroup.Text>
              <Form.Control value={employee.employee_id} name="employee_id"    className="bg-white" onChange={employeeChangeHandler}  />
            </InputGroup>
            <InputGroup className="my-3">
              <InputGroup.Text id="basic-addon1" className="font-bold">
                Email
              </InputGroup.Text>
              <Form.Control
                value={employee.email}
                name="email"
                className="bg-white" onChange={employeeChangeHandler} 
              />
            </InputGroup>
            <InputGroup className="my-3">
              <InputGroup.Text id="basic-addon1" className="font-bold">
                Mobile No
              </InputGroup.Text>
              <Form.Control value={employee.mobile_no} name="mobile_no"     className="bg-white" onChange={employeeChangeHandler}  />
            </InputGroup>
            <InputGroup className="my-3">
              <InputGroup.Text id="basic-addon1" className="font-bold">
                Alternate Mobile No
              </InputGroup.Text>
              <Form.Control value={employee.alt_mobile_no}  name="alt_mobile_no"    className="bg-white" onChange={employeeChangeHandler}  />
            </InputGroup>
            <InputGroup className="my-3">
              <InputGroup.Text id="basic-addon1" className="font-bold">
                Job Location
              </InputGroup.Text>
              <Form.Control value={employee.job_location}  name="job_location"    className="bg-white" onChange={employeeChangeHandler}  />
            </InputGroup>
            <InputGroup className="my-3">
              <InputGroup.Text id="basic-addon1" className="font-bold">
                Temporary Address
              </InputGroup.Text>
              <Form.Control
                value={employee.temp_address}
                name="temp_address"
                className="bg-white" onChange={employeeChangeHandler} 
              />
            </InputGroup>
    </div>
    <div>
          <label className='my-2 font-bold underline'>Confidential Details</label>
    
            <InputGroup className="my-3">
              <InputGroup.Text id="basic-addon1" className="font-bold">
                Pan No
              </InputGroup.Text>
              <Form.Control value={employee.pan_no} name="pan_no"     className="bg-white" onChange={employeeChangeHandler}  />
            </InputGroup>
            <InputGroup className="my-3">
              <InputGroup.Text id="basic-addon1" className="font-bold">
                Aadhar No
              </InputGroup.Text>
              <Form.Control value={employee.aadhar_no} name="aadhar_no"    className="bg-white" onChange={employeeChangeHandler}  />
            </InputGroup>
            <InputGroup className="my-3">
              <InputGroup.Text id="basic-addon1" className="font-bold">
                Account No
              </InputGroup.Text>
              <Form.Control value={employee.account_no} name="account_no"     className="bg-white" onChange={employeeChangeHandler}  />
            </InputGroup>
            <InputGroup className="my-3">
              <InputGroup.Text id="basic-addon1" className="font-bold">
                Account Holder's Name
              </InputGroup.Text>
              <Form.Control value={employee.name}  name="name"    className="bg-white" onChange={employeeChangeHandler}  />
            </InputGroup>
            <InputGroup className="my-3">
              <InputGroup.Text id="basic-addon1" className="font-bold">
                IFSC Code
              </InputGroup.Text>
              <Form.Control value={employee.ifsc_code} name="ifsc_code"    className="bg-white" onChange={employeeChangeHandler}  />
            </InputGroup>
            <InputGroup className="my-3">
              <InputGroup.Text id="basic-addon1" className="font-bold">
                Bank Name
              </InputGroup.Text>
              <Form.Control
                value={employee.bank_name}
                name="bank_name"
                className="bg-white" onChange={employeeChangeHandler}  
              />
            </InputGroup>
            <InputGroup className="my-1" >
                <InputGroup.Text id="basic-addon1" className="font-bold">Payment Amount</InputGroup.Text>
                <InputGroup.Text id="basic-addon2" className="font-bold">$</InputGroup.Text>
                   <Form.Control value={employee.fixed_salary} name="amount"   className="bg-white" onChange={employeeChangeHandler}   />
                </InputGroup>
          </div>
          </form>

         }
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={handleClose}>Close</button>
          <button className="btn btn-primary" onClick={()=>{updateEmployee();handleClose()}}>Update Employee Details</button>
          
        </Modal.Footer>
      </Modal>
        <table class="table-auto text-center border border-slate-600">
        <thead>
          <tr className="bg-slate-300">
            <th className="border border-slate-600 px-3 py-2" >S.No</th>
            <th className="border border-slate-600 px-3 py-2" >Employee Id</th>
            <th className="border border-slate-600 px-3 py-2" ></th>
            <th className="border border-slate-600 px-3 py-2" >Employee Name</th>
            <th className="border border-slate-600 px-3 py-2" >Department</th>
            <th className="border border-slate-600 px-3 py-2" >Contact No</th>
            <th className="border border-slate-600 px-3 py-2" >Edit Employee</th>
            <th className="border border-slate-600 px-3 py-2" >Delete Employee</th>
          </tr>
          
        </thead>
        <tbody>
        {employees.map((data,index)=>{return(
          <tr key={index}>
          <td className="border border-slate-600 px-3 py-2">{index+1}</td>
          <td className="border border-slate-600 px-3 py-2">{data.employee_id}</td>
          <td className="border border-slate-600 px-3 py-2"><img style={{width:'30px',height:'30px'}} src={data.img_url} ></img></td>
          <td className="border border-slate-600 px-3 py-2">{data.name}</td>
          <td className="border border-slate-600 px-3 py-2">{data.dept}</td>
          <td className="border border-slate-600 px-3 py-2">{data.mobile_no}</td>
          <td className="border border-slate-600 px-3 py-2 cursor-pointer text-yellow-600" onClick={()=>{setEmployee(data);handleShow()}}> <i class=" bi bi-pencil-square"></i></td>
          <td className="border border-slate-600 px-3 py-2 cursor-pointer text-red-600" onClick={()=>{deleteEmployee(data._id)}}> <i class="bi bi-archive"></i></td>
          </tr>
        )})}
                    
                   
                    
        </tbody>
      </table>
        </div>}
        </>
    )
}

export default ViewAllEmployees;

