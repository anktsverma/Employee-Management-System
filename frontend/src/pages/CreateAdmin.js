import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import axios from 'axios';
import { useState,useEffect } from 'react';
import Swal from 'sweetalert2';
const CreateAdmin = () => {
  
   const id=localStorage.getItem("id_a")
   const [adminData,setAdminData]=useState({name:'',admin_id:'',password:'',email:'',img_url:'',mobile_no:''});
    const adminInputHandler=(e)=>{
        setAdminData({...adminData,[e.target.name]:e.target.value})
    }
    const createAdmin=async()=>{
        const createadmin= await axios.post("/addAdmin",adminData);
        Swal.fire({
          icon: 'success',
          title: 'Create Admin',
          text:createadmin.data.message,
        })
    }
  return (
    <> 
    <div className="flex flex-col items-center justify-center p-2 overflow-y-scroll" style={{height:'80vh'}} >
     <form className='flex w-full justify-evenly'>
      <div className='w-1/2'>
      <label className='my-2 font-bold underline'>Personal Details</label>
        <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon1" className="font-bold">
            Name
          </InputGroup.Text>
          <Form.Control value={adminData.name} name="name"  className="bg-white" onChange={adminInputHandler} />
        </InputGroup>
        <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon1" className="font-bold">
            Admin Id
          </InputGroup.Text>
          <Form.Control value={adminData.admin_id} name="admin_id" className="bg-white" onChange={adminInputHandler} />
        </InputGroup>
        <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon1" className="font-bold">
            Email
          </InputGroup.Text>
          <Form.Control
            value={adminData.email}
            name="email"
         className="bg-white" onChange={adminInputHandler}
          />
        </InputGroup>
        <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon1" className="font-bold">
            Password
          </InputGroup.Text>
          <Form.Control
            value={adminData.password}
            name="password"
         className="bg-white" onChange={adminInputHandler}
          />
        </InputGroup>
        <InputGroup className="my-3">
        <InputGroup.Text id="basic-addon1" className="font-bold">
          Image Url
        </InputGroup.Text>
        <Form.Control
          value={adminData.img_url}
          name="img_url"
       className="bg-white" onChange={adminInputHandler}
        />
      </InputGroup>
        <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon1" className="font-bold">
            Mobile No
          </InputGroup.Text>
          <Form.Control value={adminData.mobile_no} name="mobile_no"  className="bg-white" onChange={adminInputHandler} />
        </InputGroup>
    
</div>
      </form>
    <button className='btn btn-primary w-40 my-3 ' onClick={()=>{createAdmin()}}><i class="bi bi-check-circle"></i> Create Admin</button>
    </div>
    </>
  )
}

export default CreateAdmin
