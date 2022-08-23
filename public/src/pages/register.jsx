import React,{useState,useEffect} from 'react';
import styled from 'styled-components'
import {Link,useNavigate} from 'react-router-dom'
import Logo from '../assets/logo.svg'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import {registerRoute} from '../utils/APIRoutes.js'


function Register(){
  const navigate=useNavigate();
  const [values,setValues]=useState({
      username:"",
      email:"",
      password:"",
      confirmpassword:""
  })
  const toastOptions={
      position:"bottom-right",
      autoClose:9000,
      theme:"dark",
      draggable:true,
      pauseOnHover:true
  }

  //direct to chat page from localhost
  useEffect(()=>{
    if(localStorage.getItem("chat-app-user")){
        navigate("/")
    }
},[navigate])
  
  const handleChange=(e)=>{
      setValues({
          ...values,
          [e.target.name]:e.target.value
      })
  }
 
  const handleValidation=()=>{
      const {username,email,password,confirmpassword}=values
    
      if(username.length>12){
          toast.error("UserName should be greater than three characters and smaller then twelve characters  ",toastOptions)  
          return false;
      }
      if(email===""){
        toast.error("Email is required",toastOptions)
        return false;
      }
      if(password !== confirmpassword){
          toast.error("Password and ConfirmPassword should be same",toastOptions)
          return false;
      }
      if(password.length<8){
          toast.error("Password should be equal or greater than eight characters",toastOptions)
          return false;
      }

      return true
  }

  const handleSubmit=
      async(e)=>{
      e.preventDefault()
      if(handleValidation()){
          const {username,email,password,confirmpassword}=values;
          const {data}=await axios.post(registerRoute,{
              username,
              email,
              password,
              confirmpassword
          })
          if(data.status===false){
              toast.error(data.msg,toastOptions)
          }
          //receive data and save it in localstorage
          if(data.status===true){
              localStorage.setItem("chat-app-user",JSON.stringify(data.user))
              toast.success(`Hello ${values.username} You Are Welcome`,toastOptions)
               navigate("/setAvatar")
              
          }
      }
  }
      
   
    return(
        <>
            <FormRegister>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div className="brand">
                        <img src={Logo} alt=""/>
                        <h1>snappy</h1>
                    </div>
                    <input 
                    type="text" 
                    placeholder="UserName" 
                    name="username" 
                    onChange={(e)=>handleChange(e)}
                    />

                    <input
                    type="email"
                    placeholder="email"
                    name="email"
                    onChange={(e)=>handleChange(e)}
                    />

                    <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={(e)=>handleChange(e)}
                    />

                    <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmpassword"
                    onChange={(e)=>handleChange(e)}
                    />

                    <button type="submit">Create User</button>
                    <span>
                        Already have an Account ? <Link to="/Login">Login</Link>
                    </span>

                </form>
            </FormRegister>
            <ToastContainer/>
        </>
    )
}
const FormRegister=styled.div`
color:red;
font-style:italic;
height:100vh;
width:100vw;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
background-color:#131324;
.brand{
    display:flex;
    justify-content:center;
    align-items:center;
    gap:1rem;
    img{
        height:5rem
    }
    h1{
        color:white;
        text-transform:uppercase;
    }
}
form{
    display:flex;
    flex-direction:column;
    gap:2rem;
    background-color:#00000076;
    border-radius:2rem;
    padding:3rem 5rem;
    input{
        background-color:transparent;
        padding:1rem;
        border:0.1rem solid #4e0eff;
        border-radius:0.4rem;
        color:white;
        font-size:1rem;
        &:focus{
            border:0.1rem solid #997af0;
            outline:none;  
        }
    }
    button{
        background-color:#997af0;
        color:white;
        padding:1rem 2rem;
        border:none;
        font-weight:bold;
        cursor:pointer;
        border-radius:0.4rem;
        font-size:1rem;
        text-transform:uppercase;
        transition:0.5s ease-in-out;
        &:hover{
            background-color:#4e0eff
        }
    }
    span{
        color:white;
        text-transform:uppercase;
       a{
            color:#4e0eff;
            text-decoration:none;
            font-weight:bold

        }
    }
}
`
export default Register