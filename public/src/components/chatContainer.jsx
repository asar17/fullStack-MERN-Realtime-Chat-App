import {useState,useEffect,useCallback} from 'react'
import styled from 'styled-components' 
import {ChatInput,Logout,Message} from './index'
import {addMessage,getAllMessage} from '../utils/APIRoutes.js'
import axios from 'axios'
import { v4 as uuidv4 } from "uuid";
import {ToastContainer,toast} from 'react-toastify'


function ChatContainer({currentConv,socket}){
    const [msg2,setMsg2]=useState([])
    const [arrivalMsg,setArrivalMsg]=useState(null)
    
    const toastOptions={
      position:"bottom-right",
      autoClose:9000,
      theme:"dark",
      draggable:true,
      pauseOnHover:true
  }
 

    //get all message after the page loaded
    useEffect(()=>{
         const getAllMsg=async()=>{
                    //get the current-user from localStorage
                    const data = await JSON.parse(
                        localStorage.getItem("chat-app-user")
                      );
                    //get all message from database
                            const response= await  axios.post(getAllMessage,{
                                from:data._id,
                                to:currentConv._id
                            })
                            setMsg2(await response.data)
                    
        }
        getAllMsg() 
        
      
    },[currentConv])


 //get current-conversation
  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentConv) {
        await JSON.parse(
          localStorage.getItem("chat-app-user")
        )._id;
      }
      

    };
    getCurrentChat();
  }, [currentConv]);

  
  //send message to database and socket
    const handleMessage=async(msg)=>{
            //get the current-user from localStorage
            const data = await JSON.parse(
                localStorage.getItem("chat-app-user")
               );
             //make connection socket for send message
                     socket.current.emit("send-msg",{
                         from :data._id,
                         to:currentConv._id,
                         message:msg
                     })
            
             //send message to database
            const data2 = await axios.post(addMessage,({
                 from :data._id,
                 to:currentConv._id,
                 message:msg
             }));
           const msgs=[...msg2]
           msgs.push({fromSelf:true,message:msg})
           setMsg2(msgs)
            
        }
       
     
       

    
    
    

 


  




    

    return(
        <>
        <Container>
            <div className="chat-header">
                <div className="user-details">
                    <div className="avatar">
                        <img src={`data:image/svg+xml;base64,${currentConv.avatarImage}`} alt="contactImage"/>
                    </div>
                    <div className="username">
                        <h3>{currentConv.username}</h3>
                    </div>
                </div>
                <Logout socket={socket}/>
            </div>
            
            <Message msg2={msg2} socket={socket} setMsg2={setMsg2}/>

            <ChatInput handleMessage={handleMessage}/>
            <ToastContainer/>

        </Container>
        </>
    )
}
const Container=styled.div`
@media screen and  (max-width:715px) {
       display:none;

     }
display: grid;
grid-template-rows: 10% 80% 10%;
gap: 0.2rem;
overflow:hidden;
margin-top:10px;
.chat-header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:0 2rem;
    border-bottom:1px solid gray;
        margin-top:10px;


}
.user-details{
    display:flex;
    align-items:center;
    justify-content:center;
    gap:1rem;
    .avatar{
        img{
            height:2rem;
        }
    }
    .username{
        h3{
            color:white;
        }
    }
    
   
}

     
    
`
export default ChatContainer