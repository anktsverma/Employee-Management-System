import './Dashboard.css';
import { useState,useEffect } from 'react';
import {Modal,Button} from 'react-bootstrap'
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar'
const Dashboard = () => {
   const [refresh,setrefresh]=useState(false);
   const [newimageurl,setnewimageurl]=useState();
   const [uploadpercentage,setuploadpercentage]=useState(0);
     useEffect(()=>{
        getEmployee();
    },[refresh])
 
    let data;
    const [employeeDetails,setEmployeeDetails]=useState({
      employeeid:"",
      name:"",
      email:"",
      username:"",
      phone:"",
      dept:"",
      imgurl:"",
    })

    const [employeeData,setEmployeeData]=useState();
    const [filteredEmployeeData,setFilteredEmployeeData]=useState();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
      setEmployeeDetails({
        employeeid:"",
        name:"",
        email:"",
        username:"",
        phone:"",
        dept:"",
        imgurl:"",
       })
      setShow(true);
    }

    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => {
      setShowEdit(false);
      setnewimageurl();
    }
    const handleShowEdit= (index) => {
      setCurrentEmployee(index)
      setShowEdit(true);
      setEmployeeDetails({
        employeeid:employeeData[index].employeeid,
        name:employeeData[index].name,
        email:employeeData[index].email,
        username:employeeData[index].username,
        phone:employeeData[index].phone,
        dept:employeeData[index].dept,
        imgurl:employeeData[index].imgurl,
       })
      
    }

    const [showEmployee, setShowEmployee] = useState(false);
    const [currentEmployee,setCurrentEmployee]=useState(-1);
    const handleCloseEmployee=()=>{setShowEmployee(false)};
    const handleShowEmployee=(index)=>{
      // console.log(index)
      setCurrentEmployee(index)
      setShowEmployee(true)
      
    };

   
    const ChangeHandler=(e)=>{
       setEmployeeDetails({...employeeDetails,[e.target.name]:e.target.value})
    }
    const getEmployee=async()=>{
       const response=await axios.get("http://localhost:5000/getemployee")
      //  console.log(response.data);
       setEmployeeData(response.data);
       setFilteredEmployeeData(response.data);
    }
    const handleDelete=async(employeeid)=>{
      const response =await axios.post("http://localhost:5000/deleteemployee",{employeeid:employeeid});
      setrefresh(!refresh);
    }

    
      
      
  

    const handleSave=async()=>{
      const options={
        onUploadProgress:(e)=>{
           const {loaded,total}=e;
           let percent=Math.floor((loaded*100)/total)
           setuploadpercentage(percent)
        }
      }
      const cloudinaryresponse=await axios.post("https://api.cloudinary.com/v1_1/dr035zcbg/image/upload",data,options)
      let temp={
        ...employeeDetails,
        imgurl:cloudinaryresponse.data.url
      }
      const response=await axios.post("http://localhost:5000/addemployee",temp)
   //   alert(response.data);
   //   console.log(response.data)
     setEmployeeDetails({
      employeeid:"",
      name:"",
      email:"",
      username:"",
      phone:"",
      dept:"",
      imgurl:"",
     })
     setrefresh(!refresh)
     setuploadpercentage(0);
     if(uploadpercentage==0)
     {
      handleClose();
     }
    }

    const handleEdit=async()=>{
      const options={
        onUploadProgress:(e)=>{
          const {loaded,total}=e;
           let percent=Math.floor((loaded*100)/total)
           setuploadpercentage(percent)
        }
      }
      const cloudinaryresponse=await axios.post("https://api.cloudinary.com/v1_1/dr035zcbg/image/upload",data,options)
      let temp={
        ...employeeDetails,
        imgurl:cloudinaryresponse.data.url
      }
      const response=await axios.post("http://localhost:5000/editemployee",temp)
      setEmployeeDetails({
        employeeid:"",
        name:"",
        email:"",
        username:"",
        phone:"",
        dept:"",
        imgurl:"",
       })
       setrefresh(!refresh)
       setuploadpercentage(0)
       if(uploadpercentage==0) {
         handleCloseEdit();
       }
    }
    const filterData=(e)=>{
          const filter=e.target.value;
          if(filter!="")
          {
           let temp=[];
           temp=employeeData.filter((e)=>{return e.dept==filter})
           setFilteredEmployeeData(temp);
          }
          else
          {
            setFilteredEmployeeData(employeeData);
          }
    }

    const imageHandler=(e)=>{
      data=new FormData()
      data.append("file",e.target.files[0])
      data.append("upload_preset","employee")
      data.append("cloud_name","dr035zcbg")
    }
    // const imageEditHandler=(e)=>{
    //   var reader = new FileReader();
    //   var url=reader.readAsDataURL(e.target.files[0])
    //   reader.onloadend=()=>{setnewimageurl(reader.result)}
    // }

    const sortHandler=(props)=>{
         filteredEmployeeData.sort((a,b) => (a.employeeid > b.employeeid) ? 1 :-1)
         console.log(filteredEmployeeData)
    }
    return (  
        <div className="Dashboard">
            <div className='d-flex justify-content-between my-5'>
               <div className='d-flex'>
                 <button className='btn btn-primary' onClick={handleShow}><i class="bi bi-plus"></i> Add Employee</button>
                 <select className='mx-3' onChange={filterData}>
                   <option value="">All</option>
                   <option value="Software Engineer">Software Engineer</option>
                   <option value="React Developer">React Developer</option>
                   <option value="Human Resource">Human Resource</option>
                   <option value="Finance">Finance</option>
                 </select>
               </div>
               <button className='btn btn-secondary'>View All Employees</button>
            </div>
            <div>
               <table className='Dashboard-table'>
                  <thead>
                     <tr>
                        <th>Id <i class="bi bi-arrow-down-up" name="id" onClick={(e)=>{sortHandler("id")}} ></i></th>
                        <th>Name <i class="bi bi-arrow-down-up" name="name" onClick={(e)=>{sortHandler("name")}}></i></th>
                        <th>Username <i class="bi bi-arrow-down-up" name="username" onClick={(e)=>{sortHandler("username")}}></i></th>
                        <th>Phone no <i class="bi bi-arrow-down-up" name="phone" onClick={(e)=>{sortHandler("phoneno")}}></i></th>
                        <th>Email <i class="bi bi-arrow-down-up" name="email" onClick={(e)=>{sortHandler("email")}}></i></th>
                        <th>Actions</th>
                     </tr>
                  </thead>
                  <tbody>
                   
                  {filteredEmployeeData && filteredEmployeeData.map((item,index)=>{
                    return(
                     <tr key={index}>
                     <td>{index+1}</td>
                     <td>{item.name}</td>
                     <td>{item.username}</td>
                     <td>{item.phone}</td>
                     <td>{item.email}</td>
                     <td><button className='btn btn-secondary mx-2' onClick={()=>handleShowEmployee(index)}><i class="bi bi-eye"></i> View</button><button className='btn btn-primary mx-2' onClick={()=>{handleShowEdit(index)}}><i class="bi bi-pencil-square"></i> Edit</button><button className='btn btn-danger mx-2' onClick={()=>{handleDelete(item.employeeid)}}><i class="bi bi-trash"></i> Delete</button></td>
                   </tr>
                    )
                  })}
                     
                  </tbody>
               </table>
              

            </div>
            <div className='d-flex justify-content-center align-items-center'>
               <button className='btn btn-primary mx-3 my-5'><i class="bi bi-chevron-left"></i> Prev</button>
               <p className='my-5'>1</p>
               <button className='btn btn-primary mx-3 my-5'>Next <i class="bi bi-chevron-right"></i></button>
            </div>


            {currentEmployee!==-1 && <Modal show={showEmployee} onHide={handleCloseEmployee} centered size="lg">
              <Modal.Header closeButton>
                 <Modal.Title>Employee Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className='d-flex justify-content-between'>
                
                <table>
                  <tbody>
                <tr><td className='p-2 fw-bold'>Employee Id</td><td className='p-2 px-3'>{employeeData[currentEmployee].employeeid}</td></tr>
                  <tr><td className='p-2 fw-bold'>Name</td><td className='p-2 px-3'>{employeeData[currentEmployee].name}</td></tr>
                  <tr><td className='p-2 fw-bold'>Username</td><td className='p-2 px-3'>{employeeData[currentEmployee].username}</td></tr>
                  <tr><td className='p-2 fw-bold'>Email</td><td className='p-2 px-3'>{employeeData[currentEmployee].email}</td></tr>
                  <tr><td className='p-2 fw-bold'>Phone</td><td className='p-2 px-3'> {employeeData[currentEmployee].phone}</td></tr>
                  <tr><td className='p-2 fw-bold'>Department</td><td className='p-2 px-3'> {employeeData[currentEmployee].dept}</td></tr>
                  </tbody>
                </table>
                <div className='d-flex flex-column align-items-center'>
                <img className="mx-5 " style={{width:"150px",height:'150px',border:'inset 5px grey'}} src={employeeData[currentEmployee].imgurl}/>
                <p>{employeeData[currentEmployee].name}</p>
                </div>
                </div>

              </Modal.Body>
              <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEmployee}>
                Close
              </Button>
              </Modal.Footer>
            </Modal>}


            <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Add Employee Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input type="text" className="form-control" id="name" placeholder="John Smith" name="name" value={employeeDetails.name} onChange={ChangeHandler}/>
                   </div>
                   {/* <div className="mb-3">
                   <label htmlFor="name" className="form-label">Employee Id</label>
                   <input type="text" className="form-control" id="name" placeholder="John Smith" name="employeeid" value={employeeDetails.employeeid} onChange={ChangeHandler}/>
                </div> */}

                   <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder="name@example.com" name="email" value={employeeDetails.email} onChange={ChangeHandler}/>
                   </div>

                   <div className="mb-3">
                      <label htmlFor="username" className="form-label">User Name</label>
                      <input type="text" className="form-control" id="username" placeholder="johnsmith21" name="username" value={employeeDetails.username} onChange={ChangeHandler}/>
                   </div>
                   <div className="mb-3">
                      <label htmlFor="phoneno" className="form-label">Phone Number</label>
                      <input type="text" className="form-control" id="phoneno" placeholder="7722334411" name="phone" value={employeeDetails.phone} onChange={ChangeHandler}/>
                   </div>
                   <div className="mb-3">
                      <label htmlFor="department" className="form-label">Department</label>
                      <select className='mx-3' name="dept" onChange={ChangeHandler} >
                         <option value="">Select Department</option>
                         <option value="Software Engineer">Software Engineer</option>
                         <option value="React Developer">React Developer</option>
                         <option value="Human Resource">Human Resource</option>
                         <option value="Finance">Finance</option>
                      </select>
                   </div>
                   <div className='mb-3'>
                         <input type="file" onChange={(e)=>{imageHandler(e)}}></input>
                         {uploadpercentage==0?null:<ProgressBar className='my-2' animated now={uploadpercentage} label={`${uploadpercentage}%`} />}
                   </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

         
          {currentEmployee!==-1 &&<Modal show={showEdit} onHide={handleCloseEdit} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Edit Employee Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className='d-flex justify-content-between'>
          <table>
          <tbody>
                  <tr><td className='p-2 fw-bold'>Employee Id</td><td className='p-2 px-3'><input value={employeeDetails.employeeid} name="employeeid" onChange={ChangeHandler} disabled></input></td></tr>
                  <tr><td className='p-2 fw-bold'>Name</td><td className='p-2 px-3'><input value={employeeDetails.name} name="name" onChange={ChangeHandler}></input></td></tr>
                  <tr><td className='p-2 fw-bold'>Username</td><td className='p-2 px-3'><input value={employeeDetails.username} name="username" onChange={ChangeHandler}></input></td></tr>
                  <tr><td className='p-2 fw-bold'>Email</td><td className='p-2 px-3'><input value={employeeDetails.email} name="email" onChange={ChangeHandler}></input></td></tr>
                  <tr><td className='p-2 fw-bold'>Phone</td><td className='p-2 px-3'> <input value={employeeDetails.phone} name="phone" onChange={ChangeHandler}></input></td></tr>
                  <tr><td className='p-2 fw-bold'>Department</td>
                  <td className='p-2 px-3'> 
                      <select name="dept" value={employeeDetails.dept} onChange={ChangeHandler} >
                         <option value="">Select Department</option>
                         <option value="Software Engineer">Software Engineer</option>
                         <option value="React Developer">React Developer</option>
                         <option value="Human Resource">Human Resource</option>
                         <option value="Finance">Finance</option>
                      </select>
                  </td>
                  </tr>
                  </tbody>
                </table>
             <div className='d-flex flex-column'>
                     <img className="" style={{width:"150px",height:'150px',border:'inset 5px grey'}} src={newimageurl?newimageurl:employeeDetails.imgurl}/>
                     <div className='m-2 '>
                         <input type="file" onChange={(e)=>{imageHandler(e)}}></input>
                         {uploadpercentage==0?null:<ProgressBar className='my-2' animated now={uploadpercentage} label={`${uploadpercentage}%`} />}
                     </div>
             </div>
             </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>
              Close
            </Button>
            <Button variant="primary" onClick={handleEdit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>}


        </div>
    );
}
 
export default Dashboard;