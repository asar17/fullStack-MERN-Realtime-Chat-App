import {useEffect,useRef,useState} from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from "uuid";
function Message({msg2,setMsg2,socket}){
  const [arrivalMsg,setArrivalMsg]=useState(null)
  const scrollRef=useRef()
                




  useEffect(()=>{
    if(socket.current){
        socket.current.on("msg-recieve",(msg)=>{
            setArrivalMsg({fromSelf:false,message:msg})
        })
    }
    
},[socket,arrivalMsg])


  useEffect(()=>{
    if(socket.current){
       arrivalMsg  && setMsg2((prev)=>[...prev,arrivalMsg])
    }
},[arrivalMsg,socket,setMsg2])


  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg2,scrollRef]);
    return(
        <>
            <Container>
                {msg2?.map((ms)=>{
                    return(
                        <div className="chat-messages" >
                            <div ref={scrollRef} key={uuidv4()}>
                                <div className ={`message ${ms?.fromSelf===true?"sended":"recieved"}`}>
                                    <div className="content">
                                        {ms?.message}
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                })}

            </Container>
        </>
   )
}
const Container=styled.div`
height:100%;
color:white;
overflow:auto;
.chat-messages{
    padding:1rem 2rem;
    overflow:auto;
    display: flex;
    flex-direction:column;
    gap: 3rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
      

      .message {
        display: flex;
        align-items: center;
        .content {
          max-width: 40%;
          overflow-wrap: break-word;
          padding: 1rem;
          font-size: 1.1rem;
          border-radius: 1rem;
          color: #d1d1d1;
          @media screen and (min-width: 720px) and (max-width: 1080px) {
            max-width: 70%;
          }
        }
      }
      .sended {
        justify-content: flex-end;
        .content {
          background-color:#9a86f3;
          color:white;
          font-weight:bold;
        font-style:italic;
        }
      }
      .recieved {
        justify-content: flex-start;
        font-weight:bold;
        font-style:italic;
        .content {
          background-color:gray;
          color:black;
        }
      }
}
`
export default Message