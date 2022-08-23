import React,{useState,useEffect,useRef,useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import {io} from "socket.io-client";
import {getAllUsers,host} from '../utils/APIRoutes.js'
import axios from 'axios';
import {Contacts,Welcome,ChatContainer} from '../components'

 function Chat(){
   
    const navigate=useNavigate();
    const socket=useRef();
    const [currentUser,setCurrentUser]=useState(undefined)
    const [getAllUsersContacts,setGetAllUsersContacts]=useState([])
    const [arrivalUser,setArrivalUser]=useState(null)
    const [conv,setConv]=useState(undefined)
    console.log("new user",arrivalUser)
    console.log("user",getAllUsersContacts)

    //get the name of user step one
   
      

    
    
    //get the name of user
    useEffect(()=>{
         const getUser= async()=>{
                    if(!localStorage.getItem("chat-app-user")){
                        navigate("/login")
                    }
                    else{
                        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
                    }
                }
          getUser();
      
    },[])

    //make connection socket for onlineUsers
    useEffect(()=>{
        if(currentUser){
            socket.current=io(host)
             socket.current.emit("add-user",{
                    currentUserId:currentUser._id,
                    username:currentUser.username,
                    avatarImage:currentUser.avatarImage,
                    email:currentUser.email,
             })
        }
    },[currentUser])



    //get Contact info 
    useEffect(()=>{
         const getContact=async()=>{
            if(currentUser){
                if(currentUser.isSetAvatarImage){
                    const data=await axios.get(`${getAllUsers}/${currentUser._id}`)
                    setGetAllUsersContacts(await data.data)
                }   
                // else{
                // navigate("/setAvatar")
                //     }
            }

        }
        getContact()
    },[currentUser])


               
    //get new contact info after registeration use socket
    const newContact=useCallback(()=>{
        if(socket.current){
            socket.current.on("newArrive-users4",(data)=>{
                setArrivalUser({username:data.username,_id:data._id,avatarImage:data.avatarImage,email:data.email})


            })
          
        }

    },[arrivalUser,socket.current])
    useEffect(()=>{
        newContact()
    },[newContact])

     //set new contact info after registeration use socket
    // final contacts
    const finalContacts=useCallback(()=>{
           if(socket?.current){
               arrivalUser&&setGetAllUsersContacts((prev)=>[...prev,arrivalUser])
            }
    },[arrivalUser,socket.current])
    useEffect(()=>{
       finalContacts()
    },[finalContacts])

   //which chat choosen
   const selectedChatConv=(chat)=>{
       setConv(chat)
   }
   
    return(
       
            <>
               <chat>
                    <Container>
                        <div className="container">
                            <Contacts  contacts={getAllUsersContacts} selectedChatConv={selectedChatConv}/>
                            
                            {
                                conv===undefined?
                                (<Welcome currentUser={currentUser}/>):(<ChatContainer currentConv={conv} currentUser={currentUser} socket={socket}/>)
                            }
                        </div>
                      
                        
                    </Container>
               </chat>
                 
            </>
        
    )
}


const Container=styled.div`
@media screen and (max-width: 715px) {
    height:100vh;
    width:100vw;  
    overflow:visible;
    display:flex;
    flex-direction:row;
    gap:1rem;
}
height:100vh;
width:100vw;
background-color:#131342;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
position:relative;
gap:1rem;
.container{
    position:relative;
     @media screen and  (max-width:715px) {
        height:auto;
         
    }
   
    width:85vw;
    height:85vh;
    background-color:#00000076;
    display:grid;
    grid-template-columns:25% 75%;
    @media screen and (min-width:720px) and (max-width:1080px){
        grid-template-columns:35% 65%;
    };
    .s{
        background-color:green
    }
    @media screen and  (max-width:715px) {
        display:flex;
        flex-direction:column;
         
    }
   
  }
`
export default Chat