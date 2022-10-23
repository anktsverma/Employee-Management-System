import './Home.css'
import {Link,useNavigate} from 'react-router-dom'
import { useState } from 'react';

import axios from 'axios';


const Home = () => {
    const[employeeData,setEmployeeData]=useState({email:"",password:""});
    const navigate=useNavigate()
    
    const EmployeeInputHandler=(e)=> setEmployeeData({...employeeData,[e.target.name]:e.target.value})
    const LoginEmployee=async()=>{
        try{
            if(!employeeData.email || !employeeData.password){
                alert('Username or password cannot be blank');
            }
            else{
                const result=await axios.post("/loginEmployee",{email:employeeData.email,password:employeeData.password});
                localStorage.setItem("id",result.data.employee[0]._id)
                localStorage.setItem("token",result.data.token)
                if(result.data.success) {
                    axios.defaults.headers.common['authorization']=`Bearer ${result.data.token}`
                    navigate("/employee_dashboard")
                }
            }
        }
        catch(err){
             if(err.response.status===400){
                 alert(err.response.data.message) 
             }
             else{
                console.log(err.response.message)
             }
        }

    }



    return (  
        <>
           <div className="d-flex justify-content-between home-main" >
               <div className="flex-1 home-left  d-flex flex-column justify-content-center align-center ">
                    <img src="login.jpg"  style={{width:'100%'}}/>
               </div>
               <div className="flex-1 home-right  d-flex flex-column justify-content-center align-center ">
                    <h1 style={{width:'75%'}} className='mx-auto px-5'>Employee Login</h1>
                    <div className=' py-3 px-5 mx-auto' style={{width:'75%'}}>
                    <div className='form-group mt-2'>
                        <lable htmlFor="email">Username</lable>
                        <input className='form-control' type="text" id="email" name='email' onChange={EmployeeInputHandler}/>
                    </div>
                    <div className='form-group mt-2'>
                       <lable htmlFor="password">Password</lable>
                       <input className='form-control' type="password" id="password" name='password' onChange={EmployeeInputHandler} />
                    </div>
                    <div></div>
                    <button className='btn btn-success mt-3 mb-3 px-4' onClick={LoginEmployee}>Login</button>
                    <Link to="#" style={{color:'inherit',textDecoration:'none'}} ><p className='my-2'>Forgot Password?</p> </Link>
                    <Link to="/login_admin" style={{color:'inherit',textDecoration:'none'}}><p >Login as Admin</p> </Link>
                </div>
               </div>
           </div>
        </>
    );
}
 
export default Home;