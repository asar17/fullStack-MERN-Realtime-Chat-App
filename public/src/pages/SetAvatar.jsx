import React,{useState,useEffect,useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import loader from '../assets/loader.gif'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios"
import {setAvatarRoute} from '../utils/APIRoutes.js'
import { Buffer } from 'buffer';
export default function SetAvatar(){
    const api = `https://api.multiavatar.com/4645646`;
    const navigate=useNavigate()
    
    const [avatars2,setAvatars2]=useState([]);
    const [selectedAvatar,setSelectedAvatar]=useState(undefined);
    const [isLoading2,setIsLoading2]=useState(true)
    const toastOptions={
        position:"bottom-right",
        autoClose:9000,
        theme:"dark",
        draggable:true,
        pauseOnHover:true
    }
// if the user don't login and navigate to setAvatar page you must login first
useEffect(()=>{
    const goToLogin=async()=>{
        if(!localStorage.getItem("chat-app-user")){
            navigate("/login")
        }
    }
    goToLogin()
},[navigate])    
   
    
         

//set profile pic after click button [set as profile picture]
const setProfilePic=async(e)=>{
    if(selectedAvatar===undefined){
        toast.error("Please select an Avatar",toastOptions)
    }
    else{
        const user=await JSON.parse(localStorage.getItem("chat-app-user"));
        const {data}= await axios.post(`${setAvatarRoute}/${user._id}`,{
            image:avatars2[selectedAvatar]
        })
        
        if(data.isSetAvatarImage){
            user.isSetAvatarImage=true
            user.avatarImage= data.avatarImage
            localStorage.setItem("chat-app-user",JSON.stringify(user))
             navigate("/login")
             e.preventDefault();
            
        }
        else{
            toast.error("Error setting Avatar. Please try again.",toastOptions)
        }

    }
}


//get avatar pic from api
  
     useEffect(()=>{
        const getAvatarPic=async()=>{

                         setIsLoading2(true);

                          try{
                                const promisesArr=[];
                                for(let i=0;i<4;i++){
                                    promisesArr.push(axios.get(`${api}/${Math.random()*1000}`));
                                }

                                const images=await Promise.all(promisesArr);

                                const buffers=images.map((el)=>{
                                    const buffer=new Buffer(el.data);
                                    return buffer.toString('base64');

                                });

                                setAvatars2(buffers);
                                setIsLoading2(false)

  
                            }
                          catch(error){
                              console.log(error.message)
                              setIsLoading2(false)

                          }
          }
       getAvatarPic()
      },[])

    return(
        <>
    
            {isLoading2?
                (<Container>
                    <img src={loader} alt="loader" className="loader"/>
                </Container>)
            :
                (
                    <Container>
                    <div className="title-container">
                        <h1>Pick an Avatar as your Profile Picture</h1>
                    </div>
                    <div className="avatars">
                        {
                            avatars2.map((avatar,index)=>{
                                return(
                                    <div 
                                    className={`avatar ${selectedAvatar===index?"selected":""}`}
                                    >
                                        <img 
                                        src={`data:image/svg+xml;base64,${avatar}`} 
                                        alt="avatar"
                                        key={avatar}
                                        onClick={()=>setSelectedAvatar(index)}
                                        />
                                        
                                    </div>
                                
                                );
                            })}
                    </div>
                    <button
                    className="submit-btn"
                    onClick={(e)=>setProfilePic(e)}
                    
                    >
                        Set as Profile Picture
                    </button>
                
                    <ToastContainer/>
                </Container>
        
                )
            }
            
        </>
    );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
