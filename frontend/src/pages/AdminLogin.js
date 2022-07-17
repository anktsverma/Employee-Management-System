import {Link,useNavigate} from 'react-router-dom'
import { useState ,useEffect } from 'react';
import './LoginAdmin.css'
import axios from 'axios'

const LoginAdmin = () => {
    const[adminData,setAdminData]=useState({email:"",password:""})

    const navigate=useNavigate()

    const AdminInputHandler=(e)=> setAdminData({...adminData,[e.target.name]:e.target.value})

    const LoginAdmin=async()=>{
        if(!adminData.email || !adminData.password){
            alert('Email or password cannot be blank')
        }
        else{
           console.log(adminData)
           const {data}=await axios.post("/admin/login",adminData)
           console.log(data)
           localStorage.setItem("id_a",data.admin[0]._id)
           localStorage.setItem("name_a",data.admin[0].name)
           localStorage.setItem("img_url_a",data.admin[0].img_url)
           localStorage.setItem("token_a",data.token)
           if(data.success) {
               axios.defaults.headers.common['authorizationa']=`Bearer ${data.token}`
               navigate('/admin_dashboard')
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
                    <h1 style={{width:'75%'}} className="mx-auto px-5">Admin Login</h1>
                    <div className=' py-3 px-5 mx-auto' style={{width:'75%'}}>
                    <div className='form-group mt-2'>
                        <lable htmlFor="username">Email</lable>
                        <input className='form-control' type="text" id="username" name='email' onChange={AdminInputHandler}/>
                    </div>
                    <div className='form-group mt-2'>
                       <lable htmlFor="password">Password</lable>
                       <input className='form-control' type="password" id="password" name='password' onChange={AdminInputHandler} />
                    </div>
                    <div></div>
                    <button className='btn btn-success mt-3 mb-3 px-4' onClick={LoginAdmin}>Login</button>
                    <Link to="#" style={{color:'inherit',textDecoration:'none'}} ><p className='my-2'>Forgot Password?</p> </Link>
                    <Link to="/" style={{color:'inherit',textDecoration:'none'}}><p >Login as employee</p> </Link>
                </div>
               </div>
           </div>
        </>
    );
}

export default LoginAdmin