import React,{useState,useEffect} from 'react';
import styled from 'styled-components'
import {Link,useNavigate} from 'react-router-dom'
import Logo from '../assets/logo.svg'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import {loginRoute} from '../utils/APIRoutes.js'


function Login(){
  const navigate=useNavigate();
  const [values,setValues]=useState({
      username:"",
      password:"",
  })
  const toastOptions={
      position:"bottom-right",
      autoClose:9000,
      theme:"dark",
      draggable:true,
      pauseOnHover:true
  }
  
  
  useEffect(()=>{
      if(localStorage.getItem("chat-app-user")){
          navigate("/")
      }
  },[])
  
  const handleChange=(e)=>{
      setValues({
          ...values,
          [e.target.name]:e.target.value
      })
  }
 
  const handleValidation=()=>{
      const {username,password}=values
    
      if(username.length ===""){
          toast.error("UserName is Required",toastOptions)  
          return false;
      }
     
      if(password===""){
          toast.error("Password is Required",toastOptions)
          return false;
      }

      return true
  }

  const handleSubmit=async(e)=>{
      console.log("athar")
      e.preventDefault()
      if(handleValidation()){
          const {username,password}=values;
          const {data}=await axios.post(loginRoute,{
              username,              
              password,
          })
          if(data.status===false){
              toast.error(data.msg,toastOptions)
          }
          //receive data and save it in localstorage
          if(data.status===true){
              localStorage.setItem("chat-app-user",JSON.stringify(data.user))
              toast.success(`Hello ${values.username} You Are Welcome`,toastOptions)
              setInterval(()=>{
                navigate("/")
              },10000)
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
                    min="3"
                    />

                    <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={(e)=>handleChange(e)}
                    />

                    <button type="submit">Login In</button>
                    <span>
                        Dont't have an Account ? <Link to="/register">Register</Link>
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
export default Login