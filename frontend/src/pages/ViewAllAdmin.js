import axios from "axios";
import { useEffect, useState } from "react";
import {Modal,Button} from 'react-bootstrap'
import { InputGroup,Form} from "react-bootstrap";
import Loader from "./Loader";
import Swal from "sweetalert2";

const ViewAllAdmin=()=>{
  const [loader,setLoader]=useState(true);
  const [show, setShow] = useState(false);
  const [admins,setAdmins]=useState('')
  const [admin,setAdmin]=useState('');
  const [refresh,setRefresh]=useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const adminChangeHandler=(e)=>setAdmin({...admin,[e.target.name]:e.target.value})

  useEffect(()=>{
      const admin=async()=>{
           const adminData=await axios.get("/admins")
           setAdmins(adminData.data)
           setLoader(false);
      }
      admin()
  },[refresh])

  const updateAdmin=async()=>{
    const id=admin._id;
    const tempadmin=await axios.patch(`/admin/${id}`,admin)
    setRefresh(!refresh)
    Swal.fire({
      icon: 'success',
      title: 'Update Admin Details',
      text:tempadmin.data.message,
    })

  }

  const deleteAdmin=async(id)=>{
    const deladmin=await axios.delete(`/admin/${id}`)
    setRefresh(!refresh)
    Swal.fire({
      icon: 'success',
      title: 'Delete Admin',
      text:deladmin.data.message,
    })
  }
    return(
      <>
        {loader&& <Loader/>}
        { admins && 
        <div className="flex flex-col  justify-center items-center my-3 overflow-y-scroll" style={{height:'80vh'}}>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Admin Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className='flex w-full justify-evenly'>
        <div className='w-full'>
        <label className='my-2 font-bold underline'>Personal Details</label>
          <InputGroup className="my-3">
            <InputGroup.Text id="basic-addon1" className="font-bold">
              Name
            </InputGroup.Text>
            <Form.Control value={admin.name} name="name"  className="bg-white" onChange={adminChangeHandler} />
          </InputGroup>
          <InputGroup className="my-3">
            <InputGroup.Text id="basic-addon1" className="font-bold">
              Admin Id
            </InputGroup.Text>
            <Form.Control value={admin.admin_id} name="admin_id" className="bg-white" onChange={adminChangeHandler} />
          </InputGroup>
          <InputGroup className="my-3">
            <InputGroup.Text id="basic-addon1" className="font-bold">
              Email
            </InputGroup.Text>
            <Form.Control
              value={admin.email}
              name="email"
           className="bg-white" onChange={adminChangeHandler}
            />
          </InputGroup>
          <InputGroup className="my-3">
            <InputGroup.Text id="basic-addon1" className="font-bold">
              Password
            </InputGroup.Text>
            <Form.Control
              value={admin.password}
              name="password"
           className="bg-white" onChange={adminChangeHandler}
            />
          </InputGroup>
          <InputGroup className="my-3">
          <InputGroup.Text id="basic-addon1" className="font-bold">
            Image Url
          </InputGroup.Text>
          <Form.Control
            value={admin.img_url}
            name="img_url"
         className="bg-white" onChange={adminChangeHandler}
          />
        </InputGroup>
          <InputGroup className="my-3">
            <InputGroup.Text id="basic-addon1" className="font-bold">
              Mobile No
            </InputGroup.Text>
            <Form.Control value={admin.mobile_no} name="mobile_no"  className="bg-white" onChange={adminChangeHandler} />
          </InputGroup>
      
  </div>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={handleClose}>Close</button>
          <button className="btn btn-primary" onClick={()=>{updateAdmin();handleClose()}}>Update Admin Details</button>
          
        </Modal.Footer>
      </Modal>
        <table class="table-auto text-center border border-slate-600">
        <thead>
          <tr className="bg-slate-300">
            <th className="border border-slate-600 px-3 py-2" >S.No</th>
            <th className="border border-slate-600 px-3 py-2" >Admin Id</th>
            <th className="border border-slate-600 px-3 py-2" ></th>
            <th className="border border-slate-600 px-3 py-2" >Admin Name</th>
            <th className="border border-slate-600 px-3 py-2" >Email</th>
            <th className="border border-slate-600 px-3 py-2" >Contact No</th>
            <th className="border border-slate-600 px-3 py-2" >Edit Admin</th>
            <th className="border border-slate-600 px-3 py-2" >Delete Admin</th>
          </tr>
          
        </thead>
        <tbody>
                   {admins.map((admin,index)=>{
                        return(
                            <tr key={index}>
                              <td className="border border-slate-600 px-3 py-2">{index+1}</td>
                              <td className="border border-slate-600 px-3 py-2">{admin.admin_id}</td>
                              <td className="border border-slate-600 px-3 py-2"><img style={{width:'30px',height:'30px'}} src={admin.img_url} /></td>
                              <td className="border border-slate-600 px-3 py-2">{admin.name}</td>
                              <td className="border border-slate-600 px-3 py-2">{admin.email}</td>
                              <td className="border border-slate-600 px-3 py-2">{admin.mobile_no}</td>
                              <td className="border border-slate-600 px-3 py-2 cursor-pointer text-yellow-600" onClick={()=>{setAdmin(admin);handleShow()}}> <i class=" bi bi-pencil-square"></i></td>
                              <td className="border border-slate-600 px-3 py-2 cursor-pointer text-red-600" onClick={()=>{deleteAdmin(admin._id)}}> <i class="bi bi-archive"></i></td>
                           </tr>
                        )
                   }) }
                   
                    
        </tbody>
      </table>
        </div>
                  }
        </>
    )
}

export default ViewAllAdmin;