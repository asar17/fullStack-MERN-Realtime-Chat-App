import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";
function ChatInput({handleMessage}){
    const [showEmojiPicker,setShowEmojiPicker]=useState(false);
    const [msg,setMsg]=useState("")
    const handleShowEmojiPicker=()=>{
        setShowEmojiPicker(!showEmojiPicker)
    }
    const handleEmojiClick=(event,emojiObject)=>{
        let message=msg;
        message +=emojiObject.emoji;
        setMsg(message)

    }
    const handleMessage2=(event)=>{
       event.preventDefault()
       event.stopPropagation();
       if(msg.length>0){
          handleMessage(msg)
          setMsg("")
           
        }
    }
    //console.log(msg)
    return(
       <>
       <Container>
           <div className="button-container">
               <div className="emoji">
                   <BsEmojiSmileFill onClick={handleShowEmojiPicker}/>
                   {showEmojiPicker&&<Picker onEmojiClick={handleEmojiClick}/>}
               </div>
           </div>
           <form className="input-container" onSubmit={(event)=>handleMessage2(event)}>
               <input type="test" 
               placeholder="Write Your Message Here!..." 
               onChange={(e)=>setMsg(e.target.value)}
               value={msg}
               />
               <button type="submit"><IoMdSend/></button>
           </form>
       </Container>
       </>
    )

}
const Container=styled.div`
display:grid;
grid-template-columns:5% 95%;
align-items:center;
justify-content:space-between;
gap:2rem;
background-color:#080420;
padding:0 2rem;
height:13.5%;

.button-container{
    display:flex;
    align-items:center;
    justify-content:center;
    gap:1rem;
    border-radius:2rem;
    padding-top:.4rem;
    
    .emoji {
        position: relative;
        svg {
          font-size: 2.8rem;
          color:#ffff00c8;
          cursor: pointer;
        }
        .emoji-picker-react {
          position: absolute;
          top: -350px;
          background-color: #080420;
          box-shadow: 0 5px 10px #9a86f3;
          border-color: #9a86f3;
          .emoji-scroll-wrapper::-webkit-scrollbar {
            background-color: #080420;
            width: 5px;
            &-thumb {
              background-color: #9a86f3;
            }
          }
          .emoji-categories {
            button {
              filter: contrast(0);
            }
          }
          .emoji-search {
            background-color: transparent;
            border-color: #9a86f3;
          }
          .emoji-group:before {
            background-color: #080420;
          }
        }
      }

}
.input-container{
    background-color: #ffffff34;
    width:100%;
    display:flex;
    align-items:center;
    gap:2rem;
    border-radius:2rem;
    input{
        width:90%;
        height:50%;
        background-color:transparent;
        color:white;
        border:none;
        padding-left:1rem;
        font-size:1.5rem;
        font-style:italic;
        &::selection {
            background-color: #9a86f3;
          }
        &:focus {
            outline: none;
          }
        }
        button{
            border-radius:2rem;
            display:flex;
            justify-content:center;
            align-items:center;
            background-color: #9a86f3;
            border:none;
            @media screen and (min-width: 720px) and (max-width: 1080px) {
                padding: 0.3rem 1rem;
                svg {
                font-size: 1rem;
                }
            }
            padding:0.3rem 2rem;
            cursor:pointer;
            svg{
                font-size:2rem;
                color:white;
            }
        }

}
`

export default ChatInput