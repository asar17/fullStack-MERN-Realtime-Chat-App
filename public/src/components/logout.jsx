import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import {BiPowerOff} from 'react-icons/bi'
function Logout(socket){ 
    const navigate=useNavigate();
    const logoutFunc=async ()=>{
        //const data = await JSON.parse(localStorage.getItem("chat-app-user"));
            // socket.emit('disconnet')
            // socket.disconnet();
            // localStorage.removeItem("chat-app-user");
            localStorage.clear()
            navigate("/login")
    }
    return(
        <>
            <Button onClick={logoutFunc}>
                <BiPowerOff/>
            </Button>
        </>
        
    )
}
const Button=styled.button`
display:flex;
justify-content:center;
align-items:center;
background-color:#9a86f3;
padding:0.5rem;
border-radius:0.5rem;
border:none;
cursor:pointer;
svg{
    font-size:1.2rem;
    color:#ebe7ff;
}
`
export default Logout