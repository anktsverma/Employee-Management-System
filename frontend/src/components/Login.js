import './Login.css'
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {Redirect} from 'react-router-dom';

const Login = () => {
    const [login,setLogin]=useState({
          email:"",
          password:""
    })

    const[loginErr,setLoginErr]=useState(false);

    const ChangeInputHandler=(e)=>{
       setLogin({
           ...login,
           [e.target.name]:e.target.value
       })
    }

    const LoginHandler=async(e)=>{
        e.preventDefault();
        setLoginErr(false);
        try{
            const Loginresponse=await axios.post("http://localhost:5000/signin",login)
            if(Loginresponse.data.messege=="Authenticated"){
                window.location.href="/dashboard"
              }
         }
         catch(err){
             setLoginErr("Email or Password Incorrect")
         }
    }

    return ( 
        <>
        <div style={{width:'100%',margin:'0 auto',height:'100vh',padding:'10px 20px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',background:"url('/bg.png') no-repeat",backgroundSize:'cover'}}>
          <div className='card' style={{padding:'40px 30px',width:'50%'}}>
           <form autoComplete="off" method="post" onSubmit={LoginHandler}>
                <div className="mb-3">
                 {loginErr && <p className='text-success'>{loginErr}</p>}
                </div>
                <div className="mb-3">
                   <label htmlFor="InputEmail" className="form-label">Email address</label>
                   <input type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp" value={login.email} onChange={ChangeInputHandler} name="email"/>
               </div>
               <div className="mb-3">
                  <label htmlFor="InputPassword" className="form-label">Password</label>
                  <input type="password" className="form-control" id="InputPassword" value={login.password} onChange={ChangeInputHandler} name="password"/>
               </div>
              <button type="submit" className="btn btn-primary">Login</button>
              <div className='d-flex justify-content-center'>
                  <p className='text-dark'>Don't have a Account yet? <Link to="/register" className='btn btn-success text-light'>Sign up</Link></p>
              </div>
          </form>
          </div>
      </div>
        </>
     );
}
 
export default Login;