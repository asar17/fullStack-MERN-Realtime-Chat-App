import {useState,useEffect} from 'react'
import styled from 'styled-components'
import logo from '../assets/logo.svg'
function Contacts({contacts,selectedChatConv}){
    const [currentUserName,setCurrentUserName]=useState(undefined);
    const [currentUserImage,setCurrentUserImage]=useState(undefined)
    const [selectedChat,setSelectedChat]=useState(undefined)
    //get the user from localStorage with useEffect
    useEffect(()=>{
        const getUser=async()=>{
            if(localStorage.getItem("chat-app-user")){
            const data=await JSON.parse(localStorage.getItem("chat-app-user"));
            setCurrentUserName(data.username)
             setCurrentUserImage(data.avatarImage)
            }
        }
        getUser()
    },[])
    
   //change background select chat
   const changeSelectedChat=(index,contact)=>{
     setSelectedChat(index)
     selectedChatConv(contact)
   }

    return(
      <>
      <Container>
          <div className="brand">
              <img src={logo} alt="logo"/>
              <h3>Snappy</h3>
          </div>
          <div className="contacts">
              {
                  contacts?.map((contact,index)=>{
                      return(
                          <div
                           className={`contact ${index===selectedChat?"selected":""}`}
                           key={contact._id}
                           onClick={()=>changeSelectedChat(index,contact)}
                           >
                              <div className="avatar">
                                 <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="contactImage"/>
                              </div>
                              <div className="username">
                                  <h3>{contact.username}</h3>
                              </div>
                          </div>
                      )
                  })
              }
          </div>
          <div className="current-user">
              <div className="avatar">
                  <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="usernameImage"/>
              </div>
              <div className="username">
                  <h2>{currentUserName}</h2>
              </div>
          </div>
      </Container>
      </>
    )

}
const Container=styled.div`
display:grid;
grid-template-rows:10% 75% 15%;
overflow:hidden;
background-color:#080420;
position:relative;
 @media screen and  (max-width:715px) {
        min-height:auto;
        gap:0.5rem;
    
    }
.brand{
    display:flex;
    justify-content:center;
    align-items:center;
    img{
        height:2rem
    }
    h3{
        color:white;
        text-transform:uppercase;
    }
    @media screen and  (max-width:715px) {
        h3{
            display:none;
        }
    }

}
.contacts{
    display:flex;
    flex-direction:column;
    overflow:auto;
    gap:0.8rem;
    padding:0.8rem;

    align-items:center;
    &::-webkit-scrollbar{
        width:0.5rem;
        &-thumb{
            width:0.1rem;
            background-color:#ffffff39;
            border-radius:1rem;
        }
    }
   
    .contact{
        display:flex;
        
        padding:0.8rem;
        transition: 0.5s ease-in-out;
        width:90%;
        min-height:5rem;
        border-radius:0.8rem;
        align-items:center;
        flex-direction:row;
        background-color:#ffffff34;
        gap:1rem;
        

        .avatar{
            display:flex;
            flex:0.5;
            img{
                height:4rem;
            }
        }
       .username{
           flex:1;
           min-width:0.5vw;
           display:flex;
           
           h3{
              font-style:italic;
               font-weight:500;
               max-width:100%;
               display:flex;
               color:white;
               align-items:center;
               justify-content:center;
               flex-direction:row;
           }
       }
        
    }
    .selected {
        background-color: #9a86f3;
      }
      @media screen and  (max-width:715px) {
             padding:0rem;
              .contact{
                    display:flex;
                    flex-direction:row;
                    min-height:7rem;
                    align-items:center;
                    justify-content:center;
                    .avatar{
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        img{
                            height:2.5rem;
                           
                        }
                    }
                    .username{
                        
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        
                    }
                }
        }
      

}
.current-user{
       
    display:flex;
    align-items:center;
    flex-direction:row;
    gap:1rem; 
    justify-content:center;
    border-radius:0.4rem;
    background-color:#9a86f3;
    .avatar{
        display:flex;
        align-items:center;
        justify-content:center;

        img{
            height:4rem;
            max-inline-size: 100%;
        }
    }
    .username{
        display:flex;
        align-items:center;
        justify-content:center;
        h2{
            display:flex;
            color:white;
            font-style:italic;
            font-size:2.2vw;
        }
    }
    @media screen and  (max-width:715px) {
          max-height:50px;
          margin-bottom:70px;
          background-color:blue;
              background-color:#9a86f3;

          .avatar{
              img{
                  height:2.5rem;
              }
          }

     }
    
}

`
export default Contacts